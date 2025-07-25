import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "nativewind";

import { View } from "react-native";
import ChipList from "~/components/ChipList";
import { CATEGORIES_QUERY_KEY } from "~/features/app/app.constants";
import { DEFAULT_FILTER } from "~/features/home/home.constants";
import { getCategories } from "~/features/recipe/recipe.service";
import { colors } from "~/theme";
import { hexToRGBA } from "~/utils/color";
import type { HomeSearchParams } from "../types";

function RecipeQuickFilter() {
  const { colorScheme } = useColorScheme();
  const params = useLocalSearchParams<HomeSearchParams>();

  const appliedCategory = params.c;
  const color = colorScheme === "dark" ? colors.gray[950] : colors.white;

  const { data, isLoading } = useQuery([CATEGORIES_QUERY_KEY], getCategories, {
    select: (data) => {
      const categoriesWithRecipes = data.filter((c) => c.numberOfRecipes > 0);
      const categories = [
        { name: "All", id: DEFAULT_FILTER },
        ...categoriesWithRecipes,
      ];
      return categories.map((category) => ({
        label: category.name,
        value: String(category.id),
      }));
    },
  });

  function updateParams(value: string) {
    if (value === DEFAULT_FILTER) {
      return router.setParams({ c: DEFAULT_FILTER });
    }

    router.setParams({ c: value });
  }

  if (isLoading)
    return (
      <ChipList
        data={[
          { label: "", value: "" },
          { label: "", value: "" },
        ]}
        selectedValues={[]}
        onPress={updateParams}
        contentContainerClassName="pr-20"
      />
    );

  if (data && data.length <= 1) return null;

  return (
    <View className="flex-1">
      <ChipList
        data={data}
        selectedValues={appliedCategory ? [appliedCategory] : [DEFAULT_FILTER]}
        onPress={updateParams}
      />
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 0.9, y: 1 }}
        className="absolute right-0 inset-y-0 w-10"
        colors={[hexToRGBA(color, 0.2), color]}
      />
    </View>
  );
}

export default RecipeQuickFilter;
