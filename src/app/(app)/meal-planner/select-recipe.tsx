import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import Button from "~/components/Button";
import Check from "~/components/Check";
import Text from "~/components/Text";
import { MEAL_PLAN_QUERY_KEY } from "~/features/app/app.constants";
import { createMealPlan } from "~/features/meal-planner/mealPlanner.service";
import RecipeImageCard from "~/features/recipe/components/RecipeImageCard";
import recipeKeys from "~/features/recipe/recipe.queryKeys";
import { getRecipes } from "~/features/recipe/recipe.service";
import { Recipe } from "~/features/recipe/recipe.types";
import useSafeAreaInsets from "~/hooks/useSafeAreaInsets";
import theme from "~/theme";

function keyExtractor(recipe: Recipe) {
  return recipe.id.toString();
}

function SelectRecipe() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ date: string }>();
  const date = new Date(params.date);
  const [selectedRecipes, setSelectedRecipes] = useState<number[]>([]);
  const queryClient = useQueryClient();

  const { data } = useQuery(recipeKeys.all, () => getRecipes());

  const mutation = useMutation({
    mutationFn: () =>
      createMealPlan(
        selectedRecipes.map((id) => ({
          recipe_id: id,
          date: date.toDateString(),
        }))
      ),
    onSettled: () => {
      queryClient.invalidateQueries([MEAL_PLAN_QUERY_KEY]);
    },
  });

  function handleRecipePress(recipe: Recipe) {
    setSelectedRecipes((prev) => {
      if (prev.includes(recipe.id)) {
        return prev.filter((r) => r !== recipe.id);
      }
      return [...prev, recipe.id];
    });
  }

  function handleSave() {
    mutation.mutate();
    router.back();
  }

  function renderRecipe({ item }: ListRenderItemInfo<Recipe>) {
    return (
      <Pressable
        onPress={() => handleRecipePress(item)}
        className="flex-row justify-between items-center gap-2"
      >
        <RecipeImageCard
          classsName="flex-1"
          recipe={item}
          onPress={() => handleRecipePress(item)}
        />
        <Check
          onPress={() => handleRecipePress(item)}
          selected={selectedRecipes.includes(item.id)}
        />
      </Pressable>
    );
  }

  return (
    <View className="flex-1 py-6">
      {data?.length ? (
        <FlatList
          data={data}
          renderItem={renderRecipe}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.recipeList}
          ListHeaderComponent={
            <Text type="header" size="xl">
              Select Recipes for {format(date, "EEEE")}
            </Text>
          }
        />
      ) : (
        <Text size="l" className="text-gray-300 self-center">
          You don't have any recipes yet!
        </Text>
      )}
      <Button
        style={{ bottom: insets.bottom }}
        className="absolute mx-4 left-0 right-0"
        onPress={handleSave}
        size="large"
        loading={mutation.isLoading}
      >
        Save
      </Button>
    </View>
  );
}

export default SelectRecipe;

const styles = StyleSheet.create({
  recipeList: {
    gap: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
    paddingBottom: 100,
  },
});
