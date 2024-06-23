import React, { useMemo, useState } from "react";
import { View } from "react-native";
import Animated, {
  Extrapolate,
  FadeIn,
  FadeOut,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

import BottomSheet from "~/components/BottomSheet";
import Check from "~/components/Check";
import Text from "~/components/Text";
import type { Ingredient } from "~/features/recipe/recipe.types";
import { SCREEN_HEIGHT, isTablet } from "~/theme";
import { cn } from "~/utils/tailwind";
import { findMatchingIngredient } from "../utils";

export function getMatchedIngredients(
  instruction: string,
  ingredients: Ingredient[] | undefined
) {
  if (!ingredients) return [];

  const words = instruction.split(" ");
  const matchedIngredients: Ingredient[] = [];
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const ingredient = findMatchingIngredient(word, ingredients);

    if (ingredient) {
      matchedIngredients.push(ingredient);
    }
  }
  return matchedIngredients;
}

export type IngredientsSheetProps = {
  position: Animated.SharedValue<number>;
  currentInstruction: string;
  ingredients?: Ingredient[];
  className?: string;
};

function IngredientsList({
  position,
  currentInstruction,
  ingredients,
  className,
}: IngredientsSheetProps) {
  const [completeIngredientIds, setCompleteIngredientIds] = useState<number[]>(
    []
  );
  const sheetIndex = useSharedValue(0);

  const matchedIngredients = getMatchedIngredients(
    currentInstruction,
    ingredients
  );

  const snapPoints = useMemo(
    () => [SCREEN_HEIGHT * 0.35, SCREEN_HEIGHT * 0.85],
    []
  );

  const height = useDerivedValue(() => {
    return interpolate(
      sheetIndex.value,
      [0, 1],
      [SCREEN_HEIGHT * 0.35 - 70, SCREEN_HEIGHT * 0.85],
      Extrapolate.CLAMP
    );
  });

  const flatListStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  function toggleIngredient(id: number) {
    setCompleteIngredientIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      }
      return [...prev, id];
    });
  }

  const sortedIngredients = useMemo(() => {
    if (!ingredients) return [];
    const copy = [...ingredients];
    return copy.sort(
      (a, b) => matchedIngredients.indexOf(b) - matchedIngredients.indexOf(a)
    );
  }, [ingredients, matchedIngredients]);

  const children = (
    <View className={cn("bg-gray-100 dark:bg-gray-900 flex-1", className)}>
      <Text className="font-display text-2xl mx-4 mt-3 mb-4">
        All Ingredients
      </Text>
      <Animated.FlatList
        style={flatListStyle}
        contentContainerStyle={{ paddingBottom: 100 }}
        keyExtractor={(item, index) => `${item}-${index}`}
        data={sortedIngredients}
        renderItem={({ item }) => {
          const isComplete = completeIngredientIds.includes(item.id);
          const isMatched = matchedIngredients.some((i) => i.id === item.id);

          return (
            <Animated.View
              entering={FadeIn.duration(200)}
              exiting={FadeOut.duration(100)}
              className="flex-row justify-between items-center mx-4 mb-4 gap-4"
              key={item.id}
            >
              <Check
                onPress={() => toggleIngredient(item.id)}
                selected={isComplete}
              />
              <Text
                className={cn(
                  "font-body text-lg flex-1 text-gray-700 dark:text-gray-200",
                  {
                    "font-body-bold text-gray-950 dark:text-white": isMatched,
                    "line-through text-gray-300 dark:text-gray-600": isComplete,
                  }
                )}
              >
                {`${item.amount ?? ""} ${item.unit ?? ""} ${item.name}`.trim()}
              </Text>
            </Animated.View>
          );
        }}
      />
    </View>
  );

  if (isTablet) {
    return children;
  }

  return (
    <BottomSheet
      animateOnMount={false}
      snapPoints={snapPoints}
      handleClassName="bg-gray-100 dark:bg-gray-900"
      handleIndicatorClassName="bg-gray-200 dark:bg-gray-600"
      backgroundClassName="flex-1"
      animatedPosition={position}
      animatedIndex={sheetIndex}
      contentHeight={height}
    >
      {children}
    </BottomSheet>
  );
}

export default IngredientsList;
