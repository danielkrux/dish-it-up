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
  translation,
}: {
  side: "left" | "right";
  icon?: IconName;
  style?: StyleProp<ViewStyle>;
  translation: SharedValue<number>;
}) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale:
          side === "right"
            ? interpolate(
                translation.value,
                [-80, -75],
                [1, 0.75],
                Extrapolation.CLAMP
              )
            : interpolate(
                translation.value,
                [75, 80],
                [0.75, 1],
                Extrapolation.CLAMP
              ),
      },
    ],
  }));

  return (
    <View
      className={
        side === "right"
          ? "items-center flex-row flex-1 justify-end rounded-2xl"
          : "items-center flex-row-reverse flex-1 justify-end rounded-2xl"
      }
      style={style}
    >
      <View className={side === "right" ? "mr-7" : "ml-7"}>
        <Animated.View style={animatedStyle}>
          <Icon name={icon ?? "Trash2"} className="text-white" size={24} />
        </Animated.View>
      </View>
    </View>
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
  ref
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
        renderRightActions={(_progress, translation) => (
          <SwipeAction
            side="right"
            icon={rightIcon}
            style={rightStyle}
            translation={translation}
          />
        )}
        onSwipeableWillOpen={handleOpen}
        renderLeftActions={
          onLeftOpen
            ? (_progress, translation) => (
                <SwipeAction
                  side="left"
                  icon={leftIcon}
                  style={leftStyle}
                  translation={translation}
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
