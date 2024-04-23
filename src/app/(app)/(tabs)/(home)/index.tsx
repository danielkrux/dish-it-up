import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback } from "react";
import { View } from "react-native";

import FloatingButton from "~/components/FloatingButton";
import Icon from "~/components/Icon";
import Text from "~/components/Text";
import { DEFAULT_FILTER } from "~/features/home/components/RecipeFilters";
import RecipeList from "~/features/home/components/RecipeList";
import recipeKeys from "~/features/recipe/recipe.queryKeys";
import { SortOptionValue, getRecipes } from "~/features/recipe/recipe.service";
import { Recipe } from "~/features/recipe/recipe.types";
import { useRefreshOnFocus } from "~/hooks/useRefreshOnFocus";

function filterRecipesByCategory(recipes: Recipe[], categoryId?: string) {
  if (!categoryId || categoryId === DEFAULT_FILTER) return recipes;
  return recipes.filter((recipe) => {
    return recipe.categories.find((c) => c.id === Number(categoryId));
  });
}

export default function Home() {
  const router = useRouter();
  const { q, c, s } = useLocalSearchParams<{
    q?: string;
    c?: string;
    s?: SortOptionValue;
  }>();
  const query = q;
  const sortBy = s;

  const { data, refetch, isLoading } = useQuery(
    recipeKeys.list(query, sortBy),
    () => getRecipes(query, sortBy),
    {
      select: useCallback(
        (data: Recipe[]) => filterRecipesByCategory(data, c),
        [c]
      ),
      keepPreviousData: true,
    }
  );

  useRefreshOnFocus(refetch);

  return (
    <View className="flex-1">
      {!data?.length && !isLoading ? (
        <View className="bg-gray-100 dark:bg-gray-900 rounded-lg mx-3 p-10 py-12 mt-12 items-center">
          <Icon className="mb-5" name="BookDashed" size={64} />
          <Text type="header" size="l" className="text-center mb-2">
            You have not added any recipes yet!
          </Text>
          <Text className="text-center">
            Add a recipe with the button below or open recipe in a browser and
            share it to Dish It Up!
          </Text>
        </View>
      ) : (
        <RecipeList data={data} isLoading={isLoading} />
      )}
      <FloatingButton onPress={() => router.push("/recipe/add/")}>
        Add recipe
      </FloatingButton>
    </View>
  );
}
