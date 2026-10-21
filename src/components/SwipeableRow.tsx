import { type ReactNode, forwardRef } from "react";
import { Pressable, type StyleProp, View, type ViewStyle } from "react-native";
import Swipeable, {
  type SwipeableMethods,
  SwipeDirection,
} from "react-native-gesture-handler/ReanimatedSwipeable";

import Animated, {
  Extrapolation,
  interpolate,
  type SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
} from "react-native-reanimated";

import Icon, { type IconName } from "./Icon";

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

function SwipeAction({
  side,
  icon,
  style,
  progress,
}: {
  side: "left" | "right";
  icon?: IconName;
  style?: StyleProp<ViewStyle>;
  progress: SharedValue<number>;
}) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale:
          side === "right"
            ? interpolate(progress.value, [0, 0.2, 1], [0.75, 0.9, 1])
            : interpolate(progress.value, [0, 0.2, 1], [0.75, 0.9, 1]),
      },
    ],
  }));

  const containerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.2, 1], [0, 0.8, 1]),
  }));

  return (
    <Animated.View
      className={
        side === "right"
          ? "items-center flex-row justify-end flex-1 rounded-2xl"
          : "items-center flex-row-reverse justify-end flex-1 rounded-2xl"
      }
      style={[style, containerStyle]}
    >
      <View className={side === "right" ? "mr-7" : "ml-7"}>
        <Animated.View style={animatedStyle}>
          <Icon name={icon ?? "Trash2"} className="text-white" size={24} />
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const SwipeableRow = forwardRef<SwipeableMethods, Props>(function SwipeableRow(
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
  ref,
) {
  // ReanimatedSwipeable reports the swipe direction: swiping left reveals the right actions.
  function handleOpen(direction: SwipeDirection) {
    if (direction === SwipeDirection.LEFT) {
      onRightOpen?.();
    }
    if (direction === SwipeDirection.RIGHT) {
      onLeftOpen?.();
    }
  }

  return (
    <Pressable onPress={onPress}>
      <Swipeable
        ref={ref}
        friction={1}
        enableTrackpadTwoFingerGesture
        renderRightActions={(progress) => (
          <SwipeAction
            side="right"
            icon={rightIcon}
            style={rightStyle}
            progress={progress}
          />
        )}
        onSwipeableWillOpen={handleOpen}
        renderLeftActions={
          onLeftOpen
            ? (progress) => (
                <SwipeAction
                  side="left"
                  icon={leftIcon}
                  style={leftStyle}
                  progress={progress}
                />
              )
            : undefined
        }
      >
        {children}
      </Swipeable>
    </Pressable>
  );
});

export default SwipeableRow;
