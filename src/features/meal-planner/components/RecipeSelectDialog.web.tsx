import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "~/components/Dialog/Dialog";
import RecipeSelectList from "./RecipeSelectList";
import { MEAL_PLAN_QUERY_KEY } from "~/features/app/app.constants";
import { Recipe } from "~/features/recipe/recipe.types";
import { createMealPlan } from "../mealPlanner.service";
import Button from "~/components/Button";
import recipeKeys from "~/features/recipe/recipe.queryKeys";
import { getRecipes } from "~/features/recipe/recipe.service";

export default function RecipeSelectDialog() {
  const params = useLocalSearchParams<{ date: string }>();
  const date = params.date ? new Date(params.date) : undefined;
  const [selectedRecipes, setSelectedRecipes] = useState<number[]>([]);
  const { data } = useQuery(recipeKeys.all, () => getRecipes());
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      createMealPlan(
        selectedRecipes.map((id) => ({
          recipe_id: id,
          date: date?.toDateString(),
        }))
      ),
    onSettled: () => {
      handleClose();
      queryClient.invalidateQueries([MEAL_PLAN_QUERY_KEY]);
    },
  });

  function handleSave() {
    mutation.mutate();
  }

  function handleRecipeSelect(recipe: Recipe) {
    setSelectedRecipes((prev) => {
      if (prev.includes(recipe.id)) {
        return prev.filter((r) => r !== recipe.id);
      }
      return [...prev, recipe.id];
    });
  }

  function handleClose() {
    setSelectedRecipes([]);
    router.navigate("/meal-planner");
  }

  if (!date) return null;

  return (
    <Dialog open={Boolean(params.date)}>
      <DialogContent
        onClose={handleClose}
        className="max-h-screen-3/4 overflow-scroll max-w-screen-md"
      >
        <RecipeSelectList
          onRecipeSelect={handleRecipeSelect}
          date={date}
          isLoading={mutation.isLoading}
          onSave={handleSave}
          selectedRecipes={selectedRecipes}
        />
      </DialogContent>
    </Dialog>
  );
}
