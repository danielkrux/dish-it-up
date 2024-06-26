import {
  type BottomSheetBackdropProps,
  type BottomSheetModalProps,
  BottomSheetView,
  BottomSheetModal as _BottomSheetModal,
} from "@gorhom/bottom-sheet";
import type React from "react";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { Keyboard, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import useKeyboardVisible from "~/hooks/useIsKeyboardVisible";
import useSafeAreaInsets from "~/hooks/useSafeAreaInsets";
import { SCREEN_WIDTH, isTablet } from "~/theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = Omit<BottomSheetModalProps, "children"> & {
  children: React.ReactNode;
};

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
      Extrapolate.CLAMP
    ),
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      style={style}
      className="bg-black/40  absolute top-0 bottom-0 left-0 right-0"
    />
  );
}

function HandleComponent() {
  return (
    <View className="flex items-center justify-center py-2 bg-white dark:bg-gray-950">
      <View className="w-12 h-2 bg-gray-200 dark:bg-gray-800 rounded-full" />
    </View>
  );
}

const BottomSheetModal = forwardRef<_BottomSheetModal, Props>(
  ({ children, ...props }, ref) => {
    const innerRef = useRef<_BottomSheetModal>(null);
    const isKeyboardVisible = useKeyboardVisible();
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    useImperativeHandle(ref, () => innerRef.current!);
    const insets = useSafeAreaInsets();

    const snapPoints = useMemo(
      () => props.snapPoints ?? ["35%"],
      [props.snapPoints]
    );

    const renderBackDrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BackdropComponent
          {...props}
          onPress={() => innerRef.current?.dismiss()}
        />
      ),
      []
    );

    const renderHandle = useCallback(() => <HandleComponent />, []);

    const insetPadding = isKeyboardVisible ? 20 : 5;

    return (
      <_BottomSheetModal
        ref={innerRef}
        detached
        snapPoints={snapPoints}
        bottomInset={insets.bottom + insetPadding}
        backdropComponent={renderBackDrop}
        style={styles.bottomSheet}
        handleComponent={renderHandle}
        keyboardBehavior="interactive"
        containerStyle={
          isTablet
            ? {
                maxWidth: 400,
                transform: [{ translateX: SCREEN_WIDTH / 2 - 200 }],
              }
            : null
        }
        {...props}
      >
        <View className="flex-1 bg-white dark:bg-gray-950 py-2 px-6">
          {children}
        </View>
      </_BottomSheetModal>
    );
  }
);

export default BottomSheetModal;

const styles = StyleSheet.create({
  bottomSheet: {
    marginHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "white",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16.0,
    elevation: 24,
    overflow: "hidden",
  },
});
