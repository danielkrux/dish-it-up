import { type ReactNode, memo } from "react";
import { View } from "react-native";

import ScrollView from "~/components/ScrollView";
import Text from "~/components/Text";
import type { Recipe } from "~/features/recipe/recipe.types";
import { ITEM_SIZE } from "../constants";
import { findMatchingIngredient } from "../utils";

function Instruction({
  data,
  item,
  index,
}: {
  data: Recipe | undefined;
  item: string;
  index: number;
}) {
  const words: string[] = item.split(" ");
  const instructionWithHighlights: ReactNode[] | string[] = words;

  //check if ingredient name is in instruction and replace with <Text/>
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const ingredient = findMatchingIngredient(word, data?.ingredients);

    if (ingredient) {
      words.filter((w) => w !== word);
      instructionWithHighlights[i] = (
        <Text className="font-body-bold text-2xl leading-relaxed lg:text-3xl text-acapulco-400 dark:text-acapulco-500">
          {word}{" "}
        </Text>
      );
    }
  }

  const instruction = instructionWithHighlights.map((word) => {
    if (typeof word !== "string") return word;
    return `${word} `;
  });

  return (
    <View className="px-5" style={{ width: ITEM_SIZE }}>
      <View className="mx-auto lg:max-w-lg">
        <Text className="font-display mb-4 text-6xl text-gray-400 dark:text-gray-400">
          Step {index + 1}
        </Text>
        <ScrollView showsVerticalScrollIndicator={false} className="flex">
          <Text
            style={{ lineHeight: 50 }}
            className="font-body text-2xl leading-relaxed lg:text-3xl"
          >
            {instruction}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}

export default memo(Instruction);
