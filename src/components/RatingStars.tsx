import { Canvas, Group, Path, fitbox, rect } from "@shopify/react-native-skia";
import * as Haptics from "expo-haptics";
import React, { useEffect } from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS } from "react-native-reanimated";

import { colors } from "~/theme";

const SIZE = 24;
const array = new Array(5).fill(0).map((_, i) => i);

export type RatingStarsProps = {
	initialValue?: number;
	onChange: (rating: number) => void;
};

function RatingStars({ initialValue, onChange }: RatingStarsProps) {
	const [selectedStarIndex, setSelectedStarIndex] = React.useState(
		initialValue ?? -1,
	);
	const SIZE_MARGIN = SIZE + 2;
	const CONTAINER_WIDTH = SIZE_MARGIN * 5;

	const tap = Gesture.Tap().onEnd(({ x }) => {
		const index = Math.floor(x / (SIZE + 2));
		runOnJS(setSelectedStarIndex)(index);
	});

	const pan = Gesture.Pan().onChange(({ x }) => {
		const index = Math.floor(x / (SIZE + 2));
		runOnJS(setSelectedStarIndex)(index);
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		onChange(selectedStarIndex + 1);
	}, [selectedStarIndex]);

	return (
		<View style={{ height: SIZE, width: CONTAINER_WIDTH }}>
			<Canvas style={{ flex: 1, height: SIZE }}>
				{array.map((i) => (
					<Group key={i} transform={[{ translateX: SIZE_MARGIN * i }]}>
						<Star selected={i <= selectedStarIndex} />
					</Group>
				))}
			</Canvas>
			<GestureDetector gesture={Gesture.Race(tap, pan)}>
				<Animated.View
					className="absolute"
					style={{ height: SIZE, width: CONTAINER_WIDTH }}
				/>
			</GestureDetector>
		</View>
	);
}

function Star({ selected }: { selected: boolean }) {
	const src = rect(0, 0, 256, 256);
	const dst = rect(0, 0, SIZE, SIZE);
	return (
		<Group transform={fitbox("contain", src, dst)}>
			<Path
				path="M 128 0 L 168 80 L 256 93 L 192 155 L 207 244 L 128 202 L 49 244 L 64 155 L 0 93 L 88 80 L 128 0 Z"
				color={selected ? colors.primary[300] : colors.primary[500]}
				opacity={selected ? 1 : 0.3}
			/>
		</Group>
	);
}

export default RatingStars;