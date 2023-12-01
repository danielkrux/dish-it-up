import React, { PropsWithChildren, useRef } from "react";
import { Animated, View, StyleProp, ViewStyle, Pressable } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import Icon, { IconName } from "./Icon";

const AnimatedView = Animated.createAnimatedComponent(View);

type Props = {
	rightIcon?: IconName;
	rightStyle?: StyleProp<ViewStyle>;
	onRightOpen?: () => void;
	leftIcon?: IconName;
	leftStyle?: StyleProp<ViewStyle>;
	onLeftOpen?: () => void;
};

function SwipeableRow({
	rightIcon,
	onRightOpen,
	rightStyle,
	leftIcon,
	onLeftOpen,
	leftStyle,
	children,
}: PropsWithChildren<Props>) {
	const swipeableRow = useRef<Swipeable>(null);

	function handleOpen(direction: "left" | "right") {
		if (direction === "right") {
			onRightOpen?.();
		}
		if (direction === "left") {
			onLeftOpen?.();
		}
	}

	function renderRightActions(
		_progress: Animated.AnimatedInterpolation<number>,
		dragX: Animated.AnimatedInterpolation<number>,
	) {
		const scale = dragX.interpolate({
			inputRange: [-80, -75],
			outputRange: [1, 0.75],
			extrapolate: "clamp",
		});

		return (
			<Pressable
				className="items-center flex-row flex-1 justify-end rounded-2xl"
				style={rightStyle}
				onPress={close}
			>
				<AnimatedView className="mr-7" style={{ transform: [{ scale }] }}>
					<Icon name={rightIcon ?? "trash-2"} color="white" size={24} />
				</AnimatedView>
			</Pressable>
		);
	}

	function renderLeftActions(
		_progress: Animated.AnimatedInterpolation<number>,
		dragX: Animated.AnimatedInterpolation<number>,
	) {
		const scale = dragX.interpolate({
			inputRange: [75, 80],
			outputRange: [0.75, 1],
			extrapolate: "clamp",
		});

		return (
			<Pressable
				className="items-center flex-row-reverse flex-1 justify-end rounded-2xl"
				style={leftStyle}
				onPress={close}
			>
				<AnimatedView className="ml-7" style={{ transform: [{ scale }] }}>
					<Icon name={leftIcon ?? "trash-2"} color="white" size={24} />
				</AnimatedView>
			</Pressable>
		);
	}

	function close() {
		swipeableRow.current?.close();
	}

	return (
		<Swipeable
			ref={swipeableRow}
			friction={1}
			shouldCancelWhenOutside
			enableTrackpadTwoFingerGesture
			renderRightActions={renderRightActions}
			onSwipeableWillOpen={handleOpen}
			renderLeftActions={renderLeftActions}
		>
			{children}
		</Swipeable>
	);
}

export default SwipeableRow;
