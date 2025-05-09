import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback } from "react";
import type { ListRenderItemInfo } from "react-native";
import { FlatList } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import SeachAndFilter from "~/features/home/components/SearchAndFilter";
import RecipeImageCard from "~/features/recipe/components/RecipeImageCard";
import type { Recipe } from "~/features/recipe/recipe.types";
import { isTablet } from "~/theme";
import type { HomeSearchParams } from "../types";

const extractKey = (item: Recipe) => item.id.toString();

const skeletonData = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
}));

export type RecipeListProps = {
  data: Recipe[] | undefined;
  isLoading: boolean;
};

function RecipeList({ data, isLoading }: RecipeListProps) {
  const router = useRouter();
  const searchParams = useLocalSearchParams<HomeSearchParams>();

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<Recipe>) => {
      const handlePress = () => {
        if (isTablet) {
          router.navigate({
            pathname: "/",
            params: {
              ...searchParams,
              recipe: String(item.id),
            } satisfies HomeSearchParams,
          });
        } else {
          router.navigate(`/recipe/${item.id}/`);
        }
      };

      if (isLoading) {
        return (
          <Animated.View
            className="h-20 bg-gray-100 rounded-2xl dark:bg-gray-900"
            entering={FadeIn}
            exiting={FadeOut}
          />
        );
      }

      return (
        <Animated.View
          testID={`recipe-card-${index}`}
          entering={FadeIn}
          exiting={FadeOut}
        >
          <RecipeImageCard recipe={item} onPress={handlePress} />
        </Animated.View>
      );
    },
    [router, isLoading, searchParams]
  );

  return (
    <FlatList
      testID="recipe-list"
      data={data ?? (skeletonData as unknown as Recipe[])}
      renderItem={renderItem}
      keyExtractor={extractKey}
      ListHeaderComponent={SeachAndFilter}
      contentContainerClassName="gap-y-4 pb-24"
      className="px-3 md:px-8 md:pt-10 native:md:pt-0"
    />
  );
}

export default RecipeList;
