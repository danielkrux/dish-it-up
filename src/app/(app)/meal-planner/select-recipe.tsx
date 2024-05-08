import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, ListRenderItemInfo, Pressable, View } from "react-native";

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
          contentContainerClassName="gap-4 px-5 pb-20"
          ListHeaderComponent={
            <Text className="mb-2 mt-2" type="header" size="2xl">
              Select Recipes for{" "}
              <Text type="header" className="text-acapulco-400">
                {format(date, "EEEE")}
              </Text>
            </Text>
          }
        />
      ) : (
        <Text size="l" className="text-gray-300 self-center">
          You don't have any recipes yet!
        </Text>
      )}
      <Button
        className="absolute mx-5 left-0 right-0"
        style={{ bottom: insets.bottom }}
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
