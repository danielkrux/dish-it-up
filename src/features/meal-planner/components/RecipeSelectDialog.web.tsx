import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";

import { Dialog, DialogContent } from "~/components/Dialog/Dialog";
import { MEAL_PLAN_QUERY_KEY } from "~/features/app/app.constants";
import type { Recipe } from "~/features/recipe/recipe.types";
import { createMealPlan } from "../mealPlanner.service";
import RecipeSelectList from "./RecipeSelectList";

export default function RecipeSelectDialog() {
  const params = useLocalSearchParams<{ date: string; note: string }>();
  const date = params.date ? new Date(params.date) : undefined;
  const [selectedRecipes, setSelectedRecipes] = useState<number[]>([]);
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
    <Dialog open={Boolean(params.date) && params.note === "false"}>
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
