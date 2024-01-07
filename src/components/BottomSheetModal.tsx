import {
	BottomSheetBackdropProps,
	BottomSheetModal as _BottomSheetModal,
	BottomSheetModalProps,
} from "@gorhom/bottom-sheet";
import { styled } from "nativewind";
import React, {
	forwardRef,
	useCallback,
	useImperativeHandle,
	useMemo,
	useRef,
} from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedReaction,
	useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SBottomSheetModal = styled(_BottomSheetModal, {
	props: {
		handleStyle: true,
		handleIndicatorStyle: true,
	},
});

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = Omit<BottomSheetModalProps, "snapPoints">;

type BackDropProps = {
	animatedIndex: Animated.SharedValue<number>;
	onPress: () => void;
};

function BackdropComponent({ animatedIndex, onPress }: BackDropProps) {
	const style = useAnimatedStyle(() => ({
		opacity: interpolate(
			animatedIndex.value,
			[-1, 0],
			[0, 1],
			Extrapolate.CLAMP,
		),
	}));

	return (
		<AnimatedPressable
			onPress={onPress}
			style={style}
			className="bg-black/40 absolute top-0 bottom-0 left-0 right-0"
		/>
	);
}

const BottomSheetModal = forwardRef<_BottomSheetModal, Props>(
	({ children, ...props }, ref) => {
		const innerRef = useRef<_BottomSheetModal>(null);
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		useImperativeHandle(ref, () => innerRef.current!);
		const insets = useSafeAreaInsets();

		const snapPoints = useMemo(() => ["30%"], []);

		const renderBackDrop = useCallback(
			(props: BottomSheetBackdropProps) => (
				<BackdropComponent
					{...props}
					onPress={() => innerRef.current?.dismiss()}
				/>
			),
			[],
		);

		return (
			<SBottomSheetModal
				ref={innerRef}
				detached
				snapPoints={snapPoints}
				bottomInset={insets.bottom}
				backdropComponent={renderBackDrop}
				style={styles.bottomSheet}
				handleStyle="bg-white dark:bg-gray-900 rounded-t-xl"
				handleIndicatorStyle="bg-gray-200 dark:bg-gray-700"
				{...props}
			>
				{children}
			</SBottomSheetModal>
		);
	},
);

export default BottomSheetModal;

const styles = StyleSheet.create({
	bottomSheet: {
		marginHorizontal: 16,
		backgroundColor: "white",
		borderRadius: 16,
		shadowColor: "rgba(0,0,0,1)",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.25,
		shadowRadius: 16.0,

		elevation: 24,
	},
});
