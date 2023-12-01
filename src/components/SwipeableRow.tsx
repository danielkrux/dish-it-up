import React, { PropsWithChildren, useRef } from "react";
import {
  Animated,
  StyleSheet,
  I18nManager,
  View,
  StyleProp,
  ViewStyle,
  Pressable,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { pallettes } from "../theme";
import Icon, { IconName } from "./Icon";

const AnimatedView = Animated.createAnimatedComponent(View);

function SwipeableRow({
  rightIcon,
  onRightOpen,
  rightStyle,
  children,
}: PropsWithChildren<{
  rightIcon?: IconName;
  rightStyle?: StyleProp<ViewStyle>;
  onRightOpen?: () => void;
}>) {
  const swipeableRow = useRef<Swipeable>(null);

  function handleOpen(direction: "left" | "right") {
    if (direction === "right") {
      onRightOpen?.();
    }
  }

  function renderRightActions(
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
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

  function close() {
    swipeableRow.current?.close();
  }

  return (
    <Swipeable
      ref={swipeableRow}
      friction={2}
      shouldCancelWhenOutside
      leftThreshold={0}
      enableTrackpadTwoFingerGesture
      rightThreshold={-50}
      renderRightActions={renderRightActions}
      onSwipeableWillOpen={handleOpen}
    >
      {children}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
    backgroundColor: "plum",
    height: 20,
  },
});

export default SwipeableRow;
