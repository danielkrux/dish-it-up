import React, { ReactNode, forwardRef } from "react";
import { Animated, Pressable, StyleProp, View, ViewStyle } from "react-native";
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
  onPress?: () => void;
  children: ReactNode;
};

const SwipeableRow = forwardRef<Swipeable, Props>(function SwipeableRow(
  {
    rightIcon,
    onRightOpen,
    rightStyle,
    leftIcon,
    onLeftOpen,
    leftStyle,
    onPress,
    children,
  },
  ref
) {
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
    dragX: Animated.AnimatedInterpolation<number>
  ) {
    const scale = dragX.interpolate({
      inputRange: [-80, -75],
      outputRange: [1, 0.75],
      extrapolate: "clamp",
    });

    return (
      <View
        className="items-center flex-row flex-1 justify-end rounded-2xl"
        style={rightStyle}
      >
        <AnimatedView className="mr-7" style={{ transform: [{ scale }] }}>
          <Icon name={rightIcon ?? "Trash2"} color="white" size={24} />
        </AnimatedView>
      </View>
    );
  }

  function renderLeftActions(
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) {
    const scale = dragX.interpolate({
      inputRange: [75, 80],
      outputRange: [0.75, 1],
      extrapolate: "clamp",
    });

    return (
      <View
        className="items-center flex-row-reverse flex-1 justify-end rounded-2xl"
        style={leftStyle}
      >
        <AnimatedView className="ml-7" style={{ transform: [{ scale }] }}>
          <Icon name={leftIcon ?? "Trash2"} color="white" size={24} />
        </AnimatedView>
      </View>
    );
  }

  return (
    <Pressable onPress={onPress}>
      <Swipeable
        ref={ref}
        friction={1}
        shouldCancelWhenOutside
        enableTrackpadTwoFingerGesture
        renderRightActions={renderRightActions}
        onSwipeableWillOpen={handleOpen}
        renderLeftActions={renderLeftActions}
      >
        {children}
      </Swipeable>
    </Pressable>
  );
});

export default SwipeableRow;
