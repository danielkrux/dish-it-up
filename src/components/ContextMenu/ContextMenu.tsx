import { Portal } from "@gorhom/portal";
import { Fragment, useState } from "react";
import { Dimensions, Platform, Pressable, StyleSheet } from "react-native";
import Animated, {
	MeasuredDimensions,
	measure,
	runOnJS,
	useAnimatedRef,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import { FullWindowOverlay } from "react-native-screens";

import IconButton from "../IconButton";
import MenuItem, { MenuItemProps } from "./MenuItem";
import {
	MENU_WIDTH,
	SPRING_CONFIGURATION,
	calcMenuHeight,
	calculateLeftPosition as calcLeftOffset,
	calculateTranslateX as calcTranslateX,
	getTransformOrigin,
} from "./utils";
import { BlurView } from "expo-blur";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const WINDOW_WIDTH = Dimensions.get("window").width;

type Action = MenuItemProps;

type ContextMenuProps = {
	actions: Action[];
};

function ContextMenu({ actions }: ContextMenuProps) {
	const [isOpen, setIsOpen] = useState(false);
	const triggerRef = useAnimatedRef<Animated.View>();
	const triggerRect = useSharedValue<MeasuredDimensions>({
		pageX: 0,
		pageY: 0,
		width: 0,
		height: 0,
	});

	const animatedStyles = useAnimatedStyle(() => {
		const menuHeight = calcMenuHeight(actions.length);

		const anchorPosition = getTransformOrigin(
			triggerRect.value?.pageX,
			triggerRect.value?.width,
			WINDOW_WIDTH,
		);
		const leftOffset = calcLeftOffset(anchorPosition, triggerRect.value?.width);
		const translateX = calcTranslateX(anchorPosition, triggerRect.value?.width);

		return {
			top: triggerRect.value?.pageY + triggerRect.value?.height + 5,
			left: triggerRect.value?.pageX + leftOffset,
			height: menuHeight,
			opacity: isOpen
				? withTiming(1, { duration: 200 })
				: withTiming(0, { duration: 200 }),
			transform: [
				{ translateX: translateX },
				{ translateY: -menuHeight / 2 },
				{
					scale: isOpen ? withSpring(1, SPRING_CONFIGURATION) : withTiming(0),
				},

				{ translateX: -translateX },
				{ translateY: menuHeight / 2 },
			],
		};
	}, [isOpen]);

	const gesture = Gesture.Tap().onBegin(() => {
		const rect = measure(triggerRef);
		triggerRect.value = rect;
		runOnJS(setIsOpen)(!isOpen);
	});

	function handleItemPress(action?: () => void) {
		setIsOpen(false);
		action?.();
	}

	const FullWindowOverLayComponent =
		Platform.OS === "ios" ? FullWindowOverlay : Fragment;

	return (
		<>
			<Animated.View collapsable={false} ref={triggerRef}>
				<GestureDetector gesture={gesture}>
					<IconButton icon="more-vertical" />
				</GestureDetector>
			</Animated.View>

			<Portal>
				<FullWindowOverLayComponent>
					<>
						<Pressable
							style={[StyleSheet.absoluteFill]}
							pointerEvents={isOpen ? "auto" : "none"}
							onPress={() => setIsOpen(false)}
						/>

						<Animated.View style={[styles.container, animatedStyles]}>
							<BlurView
								style={styles.blurContainer}
								tint="light"
								intensity={100}
							>
								{actions.map((action, i) => (
									<MenuItem
										key={`${action.label}-${i}`}
										{...action}
										onPress={() => handleItemPress(action.onPress)}
									/>
								))}
							</BlurView>
						</Animated.View>
					</>
				</FullWindowOverLayComponent>
			</Portal>
		</>
	);
}

export default ContextMenu;

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		width: MENU_WIDTH,
		borderRadius: 10,
		transform: [{ scale: 0 }],
	},
	blurContainer: {
		backgroundColor: "white",
		borderRadius: 10,
		overflow: "hidden",
	},
});
