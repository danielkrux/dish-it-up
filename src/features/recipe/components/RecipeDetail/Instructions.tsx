import React from "react";
import { View } from "react-native";
import Text from "~/components/Text";

import type { RecipeUpdate } from "../../recipe.types";

export type InstructionsProps = { recipe?: RecipeUpdate; className?: string };

function Instructions({ recipe, ...props }: InstructionsProps) {
  return (
    <View {...props}>
      <View className="md:gap-5 md:2">
        {recipe?.instructions?.map((instruction, i) => (
          <View key={`${instruction}-${i}`} className="mb-3 flex-row gap-3">
            <Text type="header" className="leading-relaxed" size="m">
              {i + 1}
            </Text>
            <Text
              className="flex-1 leading-relaxed"
              key={`${instruction}-${i}`}
            >
              {instruction}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default Instructions;
