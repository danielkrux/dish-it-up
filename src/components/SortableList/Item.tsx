import React, { ReactNode, RefObject } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	runOnJS,
	scrollTo,
	useAnimatedReaction,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import useSafeAreaInsets from "~/hooks/useSafeAreaInsets";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "~/theme";
import { Positions } from ".";
import { MARGIN, SIZE, TOTAL_SIZE, getOrder } from "./config";

interface ItemProps {
	children: ReactNode;
	positions: Positions;
	setPositions: (positions: Positions) => void;
	id: string;
	onDragEnd: (diffs: Positions) => void;
	scrollView: RefObject<Animated.ScrollView>;
	scrollX: Animated.SharedValue<number>;
}

function Item({
	children,
	id,
	onDragEnd,
	positions,
	setPositions,
	scrollView,
	scrollX,
}: ItemProps) {
	const isGestureActive = useSharedValue(false);
	const index = positions?.[id];

	const x = TOTAL_SIZE * index;
	const translateX = useSharedValue(x);
	const offset = useSharedValue(x);

	useAnimatedReaction(
		() => positions[id],
		(newIndex) => {
			if (!isGestureActive.value) {
				const pos = TOTAL_SIZE * newIndex;
				translateX.value = withTiming(pos);
			}
		},
	);

	const style = useAnimatedStyle(() => {
		const zIndex = isGestureActive.value ? 100 : 0;
		return {
			position: "absolute",
			top: 0,
			left: 0,
			width: TOTAL_SIZE,
			height: TOTAL_SIZE,
			zIndex,
			transform: [
				{ translateX: Number.isNaN(translateX.value) ? 0 : translateX.value },
			],
		};
	});

	const panGesture = Gesture.Pan()
		.activateAfterLongPress(200)
		.onStart(() => {
			offset.value = translateX.value;
			isGestureActive.value = true;
		})
		.onUpdate(({ translationX }) => {
			translateX.value = offset.value + translationX;
			const oldIndex = positions[id];
			const newIndex = getOrder(translateX.value);

			if (newIndex !== oldIndex) {
				const idToSwap = Object.keys(positions).find(
					(key) => positions[key] === newIndex,
				);
				if (idToSwap) {
					// Spread operator is not supported in worklets
					// And Object.assign doesn't seem to be working on alpha.6
					const newPositions = JSON.parse(JSON.stringify(positions));
					newPositions[id] = newIndex;
					newPositions[idToSwap] = oldIndex;
					runOnJS(setPositions)(newPositions);
				}
			}

			// 3. Scroll up and down if necessary
			const lowerBound = scrollX.value;
			const upperBound = lowerBound + SCREEN_WIDTH - SIZE * 2;
			const maxScroll = positions.length * TOTAL_SIZE;
			const leftToScroll = maxScroll - scrollX.value;
			if (translateX.value < lowerBound) {
				const diff = Math.min(lowerBound - translateX.value, lowerBound);
				scrollX.value -= diff;
				scrollTo(scrollView, 0, scrollX.value, false);
				offset.value -= diff;
				translateX.value = offset.value + translationX;
			}
			if (translateX.value > upperBound) {
				const diff = Math.min(translateX.value - upperBound, leftToScroll);
				scrollX.value += diff;
				scrollTo(scrollView, 0, scrollX.value, false);
				offset.value += diff;
				translateX.value = offset.value + translationX;
			}
		})
		.onEnd(() => {
			const newIndex = positions[id];
			const x = TOTAL_SIZE * newIndex;
			translateX.value = withTiming(x, undefined, () => {
				isGestureActive.value = false;
				runOnJS(onDragEnd)(positions);
			});
		});

	return (
		<GestureDetector gesture={panGesture}>
			<Animated.View style={style}>{children}</Animated.View>
		</GestureDetector>
	);
}

export default Item;
