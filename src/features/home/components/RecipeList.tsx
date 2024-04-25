import React, { useCallback } from "react";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useRouter } from "expo-router";

import theme, { isTablet } from "~/theme";
import useHomeContext from "~/features/home/hooks/useHomeContext";
import SeachAndFilter from "~/features/home/components/SearchAndFilter";
import { Recipe } from "~/features/recipe/recipe.types";
import RecipeImageCardWithContext from "~/features/recipe/components/RecipeImageCardWithContext";

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

  const { recipeId, setRecipeId } = useHomeContext();

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Recipe>) => {
      const handlePress = () => {
        if (isTablet) {
          setRecipeId(item.id);
        } else {
          router.push(`/recipe/${item.id}/`);
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
        <Animated.View entering={FadeIn} exiting={FadeOut}>
          <RecipeImageCardWithContext recipe={item} onPress={handlePress} />
        </Animated.View>
      );
    },
    [setRecipeId, router, isLoading]
  );

  return (
    <FlatList
      data={data ?? (skeletonData as unknown as Recipe[])}
      renderItem={renderItem}
      keyExtractor={extractKey}
      ListHeaderComponent={SeachAndFilter}
      contentContainerStyle={styles.recipeListContent}
      className="px-3 md:px-8 mt-1"
      numColumns={isTablet && !recipeId ? 2 : 1}
      ItemSeparatorComponent={() => (
        <View className="border-b border-b-gray-50 dark:border-b-gray-900 h-1 w-[255] self-end" />
      )}
      columnWrapperStyle={
        isTablet && !recipeId ? styles.recipeColumnWrapper : undefined
      }
      key={recipeId ? "single-column" : "multi-column"}
    />
  );
}

export default RecipeList;

const styles = StyleSheet.create({
  recipeListContent: {
    paddingBottom: 100,
    gap: theme.spacing.m,
  },
  recipeColumnWrapper: {
    gap: theme.spacing.m,
  },
});
