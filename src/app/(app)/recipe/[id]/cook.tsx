import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useRef } from "react";
import { ListRenderItemInfo, Platform, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Toast from "react-native-toast-message";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import IconButton from "~/components/IconButton";
import useFetchRecipe from "~/features/recipe/hooks/useFetchRecipe";
import useSafeAreaInsets from "~/hooks/useSafeAreaInsets";
import { SCREEN_WIDTH } from "~/theme";
import Button from "~/components/Button";
import IngredientsSheet from "~/features/cook-mode/components/IngredientsSheet";
import LogRecipe from "~/features/recipe/components/LogRecipe";
import ActionsRow from "~/features/cook-mode/components/ActionsRow";
import Instruction from "~/features/cook-mode/components/Instruction";
import { ITEM_SIZE, ITEM_SPACING } from "~/features/cook-mode/constants";

function keyExtractor(item: string, index: number) {
  return `${item}-${index}`;
}

function Cook() {
  const params = useLocalSearchParams();
  const id = Number(params.id);
  const { data } = useFetchRecipe(id);
  const instructionsLength = data?.instructions?.length ?? 0;

  const ref = useRef<Animated.FlatList<string>>(null);
  const logRecipeRef = useRef<BottomSheetModal>(null);

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const index = useSharedValue(0);
  const bottomSheetPosition = useSharedValue(0);

  const insets = useSafeAreaInsets();
  const extraPadding = Platform.OS === "ios" ? 0 : 10;

  useAnimatedReaction(
    () => index.value,
    (value) => {
      const clampedIndex = Math.max(
        0,
        Math.min(value, (data?.instructions?.length ?? 0) - 1)
      );
      return runOnJS(setCurrentIndex)(Math.round(clampedIndex));
    }
  );

  const handleScroll = useAnimatedScrollHandler((e) => {
    index.value =
      e.contentOffset.x / (e.layoutMeasurement.width - ITEM_SPACING);
  });

  function handleLogSave() {
    router.back();
    Toast.show({
      type: "success",
      text1: "Recipe logged!",
    });
  }

  const renderInstruction = useCallback(
    ({ item, index }: ListRenderItemInfo<string>) => (
      <Instruction data={data} item={item} index={index} />
    ),
    [data]
  );

  return (
    <View
      className="flex-1 bg-white dark:bg-gray-950"
      style={{ paddingTop: insets.top + extraPadding }}
    >
      <View className="flex-row mx-4 items-center justify-between">
        <IconButton icon="X" size="medium" onPress={router.back} />
        <Button
          onPress={() => logRecipeRef.current?.present()}
          variant="secondary"
        >
          DONE
        </Button>
      </View>
      <Animated.FlatList
        ref={ref}
        data={data?.instructions}
        horizontal
        onScroll={handleScroll}
        renderItem={renderInstruction}
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0, marginTop: 30 }}
        contentContainerStyle={{
          gap: ITEM_SPACING,
          paddingHorizontal: ITEM_SPACING,
          justifyContent: "center",
          alignItems: "center",
        }}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_SIZE + ITEM_SPACING}
        decelerationRate="fast"
        scrollEventThrottle={16}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
      />
      <ActionsRow
        animatedIndex={index}
        bottomSheetPosition={bottomSheetPosition}
        index={currentIndex}
        instructionsLength={instructionsLength}
        stepsListRef={ref}
      />
      <IngredientsSheet
        currentInstruction={data?.instructions?.[currentIndex] ?? ""}
        position={bottomSheetPosition}
        ingredients={data?.ingredients}
      />
      <LogRecipe
        ref={logRecipeRef}
        recipeId={data?.id}
        onSave={handleLogSave}
      />
    </View>
  );
}

export default Cook;
