import React, { ReactElement, useEffect, useState } from "react";
import Animated, {
	useAnimatedRef,
	useAnimatedScrollHandler,
	useSharedValue,
} from "react-native-reanimated";

import Item from "./Item";
import { SIZE, TOTAL_SIZE } from "./config";

export interface Positions {
	[id: string]: number;
}

interface ListProps {
	children: ReactElement<{ id: string }>[];
	onDragEnd: (diff: Positions) => void;
}

const SortableList = ({ children, onDragEnd }: ListProps) => {
	const [positions, setPositions] = useState<Positions>();
	const scrollX = useSharedValue(0);
	const scrollView = useAnimatedRef<Animated.ScrollView>();

	const onScroll = useAnimatedScrollHandler({
		onScroll: ({ contentOffset: { x } }) => {
			scrollX.value = x;
		},
	});

	useEffect(() => {
		if (!children.length) return;
		const pos = Object.assign(
			{},
			...children.map((child, index) => ({ [child.props.id]: index })),
		);
		if (!positions) {
			setPositions(pos);
		}
	}, [children, positions]);

	if (!children.length || !positions) return null;

	return (
		<Animated.ScrollView
			onScroll={onScroll}
			ref={scrollView}
			contentContainerStyle={{
				height: SIZE,
				width: TOTAL_SIZE * children.length,
			}}
			bounces={false}
			scrollEventThrottle={16}
			showsHorizontalScrollIndicator={false}
		>
			{children.map((child) => (
				<Item
					key={child.props.id}
					positions={positions}
					setPositions={setPositions}
					id={child.props.id}
					onDragEnd={onDragEnd}
					scrollView={scrollView}
					scrollX={scrollX}
				>
					{child}
				</Item>
			))}
		</Animated.ScrollView>
	);
};

export default SortableList;
