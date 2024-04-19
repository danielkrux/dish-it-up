import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import React from "react";
import { View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import IconButton from "~/components/IconButton";
import Text from "~/components/Text";

const ITEM_SIZE = SCREEN_WIDTH * 0.8;
const ITEM_SPACING = (SCREEN_WIDTH - ITEM_SIZE) / 2;

export type ActionsRowProps = {
  index: number;
  instructionsLength: number;
  animatedIndex: Animated.SharedValue<number>;
  stepsListRef: React.RefObject<Animated.FlatList<string>>;
  bottomSheetPosition: Animated.SharedValue<number>;
};

function ActionsRow({
  index,
  instructionsLength,
  animatedIndex,
  stepsListRef,
  bottomSheetPosition,
}: ActionsRowProps) {
  const [actionsY, setActionsY] = React.useState(0);

  const actionsStyle = useAnimatedStyle(() => ({
    opacity: withTiming(bottomSheetPosition.value > actionsY + 50 ? 1 : 0),
    transform: [{ translateY: bottomSheetPosition.value - actionsY - 70 }],
  }));

  const progressBarTranslate = useDerivedValue(() => {
    // SCREEN_WIDTH - OUTER_PADDING - LEFT_ARROW - RIGHT_ARROW - INNER_PADDING
    const progressBarWidth = SCREEN_WIDTH - (16 * 2 + 44 * 2 + 12 * 2);
    return interpolate(
      animatedIndex.value,
      [0, instructionsLength - 1],
      [-progressBarWidth, 0],
      Extrapolate.CLAMP
    );
  });

  const progressBarStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progressBarTranslate.value }],
  }));

  return (
    <Animated.View
      onLayout={(e) => {
        setActionsY(e.nativeEvent.layout.y);
      }}
      style={actionsStyle}
      className="flex-row mx-4 g-3 items-center"
    >
      <IconButton
        onPress={() =>
          // @ts-ignore
          stepsListRef.current?.scrollToOffset({
            offset: (ITEM_SIZE + ITEM_SPACING) * (index - 1),
            animated: true,
          })
        }
        size="large"
        icon="ChevronLeft"
      />
      <View className="bg-gray-100 dark:bg-gray-900 rounded-full flex-1 h-full overflow-hidden">
        <Animated.View
          style={progressBarStyle}
          className="absolute left-0 top-0 bottom-0 right-0 bg-acapulco-400/80"
        />
        <Text className="mt-3 font-body-bold self-center text-gray-800 dark:text-gray-50">
          {index + 1} / {instructionsLength}
        </Text>
      </View>
      <IconButton
        onPress={() =>
          // @ts-ignore
          stepsListRef.current?.scrollToOffset({
            offset: (ITEM_SIZE + ITEM_SPACING) * (index + 1),
            animated: true,
          })
        }
        size="large"
        icon="ChevronRight"
      />
    </Animated.View>
  );
}

export default ActionsRow;
