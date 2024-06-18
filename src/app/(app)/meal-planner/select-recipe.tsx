import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

import RecipeSelectList from "~/features/meal-planner/components/RecipeSelectList";
import { useCreateMealPlan } from "~/features/meal-planner/hooks/useCreateMealPlan";

import type { Recipe } from "~/features/recipe/recipe.types";

function SelectRecipe() {
  const params = useLocalSearchParams<{ date: string }>();
  const date = params.date ? new Date(params.date) : new Date();
  const [selectedRecipes, setSelectedRecipes] = useState<number[]>([]);

  const itemsToSave = selectedRecipes.map((recipeId) => ({
    recipe_id: recipeId,
    date: date.toDateString(),
  }));

  const mutation = useCreateMealPlan({
    items: itemsToSave,
    onCompleted: () => {
      router.dismiss();
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
