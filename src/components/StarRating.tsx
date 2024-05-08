import { Canvas, Group, Path, fitbox, rect } from "@shopify/react-native-skia";
import React, { useEffect } from "react";
import { Pressable, View, ViewProps } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS } from "react-native-reanimated";

import { ImpactFeedbackStyle, impactAsync } from "expo-haptics";
import { colors } from "~/theme";
import Text from "./Text";
import clsx from "clsx";

const SIZE = 24;
const array = new Array(5).fill(0).map((_, i) => i);

export type RatingStarsProps = {
  initialValue?: number | null;
  short?: boolean;
  className?: string;
  onChange?: (rating: number) => void;
  onPress?: () => void;
};

function StarRating({
  initialValue,
  short = false,
  onChange,
  onPress,
  ...props
}: RatingStarsProps) {
  const [selectedStarIndex, setSelectedStarIndex] = React.useState(
    initialValue ?? -1
  );
  const SIZE_MARGIN = SIZE + 2;
  const CONTAINER_WIDTH = SIZE_MARGIN * 5;

  const tap = Gesture.Tap().onEnd(({ x }) => {
    const index = Math.floor(x / (SIZE + 2));
    runOnJS(impactAsync)(ImpactFeedbackStyle.Light);
    runOnJS(setSelectedStarIndex)(index);
  });

  const pan = Gesture.Pan().onChange(({ x }) => {
    const index = Math.floor(x / (SIZE + 2));
    const clampedIndex = Math.min(Math.max(index, -1), 4);
    if (clampedIndex !== selectedStarIndex) {
      runOnJS(impactAsync)(ImpactFeedbackStyle.Light);
      runOnJS(setSelectedStarIndex)(clampedIndex);
    }
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    onChange?.(selectedStarIndex + 1);
  }, [selectedStarIndex]);

  if (short) {
    if (selectedStarIndex < 0) return;

    return (
      <Pressable
        onPress={onPress}
        className={clsx("flex-row items-center gap-1.5", props.className)}
      >
        <Canvas style={{ width: SIZE, height: SIZE }}>
          <Star selected={Boolean(selectedStarIndex)} />
        </Canvas>
        <Text className="font-body-bold text-base text-gray-700 dark:text-gray-200">
          {initialValue}
        </Text>
      </Pressable>
    );
  }

  return (
    <View
      className={props.className}
      style={{ height: SIZE, width: CONTAINER_WIDTH }}
    >
      <Canvas style={{ flex: 1, height: SIZE }}>
        {array.map((i) => (
          <Group key={i} transform={[{ translateX: SIZE_MARGIN * i }]}>
            <Star selected={i <= selectedStarIndex} />
          </Group>
        ))}
      </Canvas>
      <GestureDetector gesture={Gesture.Race(tap, pan)}>
        <Animated.View
          className="absolute"
          style={{ height: SIZE, width: CONTAINER_WIDTH }}
        />
      </GestureDetector>
    </View>
  );
}

export default StarRating;

function Star({ selected }: { selected: boolean }) {
  const src = rect(0, 0, 256, 256);
  const dst = rect(0, 0, SIZE, SIZE);
  return (
    <Group transform={fitbox("contain", src, dst)}>
      <Path
        path="M 128 0 L 168 80 L 256 93 L 192 155 L 207 244 L 128 202 L 49 244 L 64 155 L 0 93 L 88 80 L 128 0 Z"
        color={selected ? colors.primary[300] : colors.primary[400]}
        opacity={selected ? 1 : 0.3}
      />
    </Group>
  );
}
