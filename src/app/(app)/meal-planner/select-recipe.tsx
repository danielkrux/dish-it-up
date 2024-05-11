import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

import { MEAL_PLAN_QUERY_KEY } from "~/features/app/app.constants";
import RecipeSelectList from "~/features/meal-planner/components/RecipeSelectList";
import { createMealPlan } from "~/features/meal-planner/mealPlanner.service";
import { Recipe } from "~/features/recipe/recipe.types";

function SelectRecipe() {
  const params = useLocalSearchParams<{ date: string }>();
  const date = new Date(params.date);
  const [selectedRecipes, setSelectedRecipes] = useState<number[]>([]);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      createMealPlan(
        selectedRecipes.map((id) => ({
          recipe_id: id,
          date: date.toDateString(),
        }))
      ),
    onSettled: () => {
      router.dismiss();
      queryClient.invalidateQueries([MEAL_PLAN_QUERY_KEY]);
    },
  });

  function handleRecipeSelect(recipe: Recipe) {
    setSelectedRecipes((prev) => {
      if (prev.includes(recipe.id)) {
        return prev.filter((r) => r !== recipe.id);
      }
      return [...prev, recipe.id];
    });
  }

  return (
    <RecipeSelectList
      date={date}
      onSave={mutation.mutate}
      isLoading={mutation.isLoading}
      selectedRecipes={selectedRecipes}
      onRecipeSelect={handleRecipeSelect}
    />
  );
}

export default SelectRecipe;
