import { useCallback } from "react";
import { type ListRenderItemInfo, View } from "react-native";
import Animated, {
  type SharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import ActionsRow from "~/features/cook-mode/components/ActionsRow";
import Instruction from "~/features/cook-mode/components/Instruction";
import { ITEM_SIZE, ITEM_SPACING } from "~/features/cook-mode/constants";
import type { Recipe } from "~/features/recipe/recipe.types";
import { SCREEN_HEIGHT } from "~/theme";

function keyExtractor(item: string, index: number) {
  return `${item}-${index}`;
}

export type StepsListProps = {
  ref: React.RefObject<Animated.FlatList<string> | null>;
  index: SharedValue<number>;
  data: Recipe | undefined;
  bottomSheetPosition: SharedValue<number>;
  currentIndex: number;
};

function StepsList({
  ref,
  index,
  data,
  bottomSheetPosition,
  currentIndex,
}: StepsListProps) {
  const handleScroll = useAnimatedScrollHandler((e) => {
    index.value =
      e.contentOffset.x / (e.layoutMeasurement.width - ITEM_SPACING);
  });

  const renderInstruction = useCallback(
    ({ item, index }: ListRenderItemInfo<string>) => (
      <Instruction data={data} item={item} index={index} />
    ),
    [data]
  );

  return (
    <View className="flex-1 md:items-center">
      <Animated.FlatList
        ref={ref}
        data={data?.instructions}
        horizontal
        onScroll={handleScroll}
        renderItem={renderInstruction}
        showsHorizontalScrollIndicator={false}
        style={{
          marginTop: 30,
          maxHeight: SCREEN_HEIGHT * 0.65,
          maxWidth: ITEM_SIZE,
        }}
        contentContainerStyle={{ marginBottom: 50 }}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_SIZE + ITEM_SPACING}
        decelerationRate="fast"
        scrollEventThrottle={16}
      />
      <ActionsRow
        animatedIndex={index}
        bottomSheetPosition={bottomSheetPosition}
        index={currentIndex}
        instructionsLength={data?.instructions?.length ?? 0}
        stepsListRef={ref}
        className="md:left-0 md:top-[unset] md:bottom-12 md:right-0"
      />
    </View>
  );
}

export default StepsList;
