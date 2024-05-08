import {
  BottomSheetBackdropProps,
  BottomSheetModal as _BottomSheetModal,
  BottomSheetModalProps,
} from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { SBottomSheetModal } from "~/app/_layout";
import useSafeAreaInsets from "~/hooks/useSafeAreaInsets";
import { SCREEN_WIDTH, isTablet } from "~/theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = Omit<BottomSheetModalProps, "snapPoints" | "children"> & {
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

const BottomSheetModal = forwardRef<_BottomSheetModal, Props>(
  ({ children, ...props }, ref) => {
    const innerRef = useRef<_BottomSheetModal>(null);
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    useImperativeHandle(ref, () => innerRef.current!);
    const insets = useSafeAreaInsets();

    const snapPoints = useMemo(() => ["35%"], []);

    const renderBackDrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BackdropComponent
          {...props}
          onPress={() => innerRef.current?.dismiss()}
        />
      ),
      []
    );

    return (
      <SBottomSheetModal
        ref={innerRef}
        detached
        snapPoints={snapPoints}
        bottomInset={insets.bottom + 5}
        backdropComponent={renderBackDrop}
        style={styles.bottomSheet}
        handleClassName="bg-white dark:bg-gray-950 rounded-t-xl"
        handleIndicatorClassName="bg-gray-200 dark:bg-gray-700"
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
        <View className="flex-1 bg-white dark:bg-gray-950 px-4">
          {children}
        </View>
      </SBottomSheetModal>
    );
  }
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
    overflow: "hidden",
  },
});
