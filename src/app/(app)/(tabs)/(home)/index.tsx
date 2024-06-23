import { useQuery } from "@tanstack/react-query";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback } from "react";
import { Platform, View } from "react-native";

import FloatingButton from "~/components/FloatingButton";
import Icon from "~/components/Icon";
import Text from "~/components/Text";
import { DEFAULT_FILTER } from "~/features/home/components/RecipeFilters";
import RecipeList from "~/features/home/components/RecipeList";
import type { HomeSearchParams } from "~/features/home/types";
import recipeKeys from "~/features/recipe/recipe.queryKeys";
import { getRecipes, getRecipesCount } from "~/features/recipe/recipe.service";
import type { Recipe } from "~/features/recipe/recipe.types";
import { useRefreshOnFocus } from "~/hooks/useRefreshOnFocus";

function filterRecipesByCategory(recipes: Recipe[], categoryId?: string) {
  if (!categoryId || categoryId === DEFAULT_FILTER) return recipes;
  return recipes.filter((recipe) => {
    return recipe.categories.find((c) => c.id === Number(categoryId));
  });
}

export default function Home() {
  const router = useRouter();
  const { q, c, s, recipe } = useLocalSearchParams<HomeSearchParams>();
  const query = q;
  const sortBy = s;

  const { data: count } = useQuery(recipeKeys.count, getRecipesCount);

  const { data, refetch, isLoading } = useQuery(
    recipeKeys.list(query, sortBy),
    () => getRecipes(query, sortBy),
    {
      select: useCallback(
        (data: Recipe[]) => filterRecipesByCategory(data, c),
        [c]
      ),
    }
  );

  useRefreshOnFocus(refetch);

  useFocusEffect(
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useCallback(() => {
      if (!data?.length) return;
      router.setParams({
        recipe: data?.[0].id.toString(),
      });
    }, [data])
  );

  return (
    <View className="flex-1">
      {!count && !isLoading ? (
        <View className="bg-gray-100 dark:bg-gray-900 rounded-lg mx-3 p-10 py-12 mt-12 items-center">
          <Icon name="BookDashed" size={64} />
          <Text type="header" size="l" className="text-center mt-5 mb-2">
            You have not added any recipes yet.
          </Text>
          <Text className="text-center">
            {Platform.OS === "web"
              ? "Add a recipe with the button below!"
              : "Add a recipe with the button below or open recipe in a browser and share it to Dish It Up!"}
          </Text>
        </View>
      ) : (
        <RecipeList data={data} isLoading={isLoading} />
      )}
      <FloatingButton
        onPress={() =>
          router.navigate({ pathname: "/recipe/add", params: { recipe } })
        }
      >
        Add recipe
      </FloatingButton>
    </View>
  );
}
