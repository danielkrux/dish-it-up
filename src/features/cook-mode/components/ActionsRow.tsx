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
import { ITEM_SIZE } from "../constants";

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
  const [progressBarWidth, setProgressBarWidth] = React.useState(0);

  const actionsStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(bottomSheetPosition.value > 500 ? 1 : 0),
      transform: [{ translateY: bottomSheetPosition.value - 50 }],
    };
  });

  const progressBarTranslate = useDerivedValue(() => {
    // SCREEN_WIDTH - OUTER_PADDING - LEFT_ARROW - RIGHT_ARROW - INNER_PADDING
    return interpolate(
      animatedIndex.value,
      [0, instructionsLength - 1],
      [-progressBarWidth, 0],
      Extrapolate.CLAMP
    );
  });

  const progressBarStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: progressBarTranslate.value }],
    };
  });

  return (
    <Animated.View
      style={actionsStyle}
      className="absolute top-0 flex-row mx-4 gap-3 items-center"
    >
      <IconButton
        onPress={() =>
          stepsListRef.current?.scrollToOffset({
            offset: ITEM_SIZE * (index - 1),
            animated: true,
          })
        }
        size="large"
        icon="ChevronLeft"
      />
      <View className="bg-gray-100 dark:bg-gray-900 rounded-full flex-1 overflow-hidden h-full">
        <Animated.View
          onLayout={(e) => setProgressBarWidth(e.nativeEvent.layout.width)}
          style={progressBarStyle}
          className="absolute left-0 top-0 bottom-0 right-0 bg-acapulco-400/70 pointer-events-none"
        />
        <Text className="mt-3 font-body-bold self-center text-gray-800 dark:text-gray-50">
          {index + 1} / {instructionsLength}
        </Text>
      </View>
      <IconButton
        onPress={() =>
          // @ts-ignore
          stepsListRef.current?.scrollToOffset({
            offset: ITEM_SIZE * (index + 1),
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
