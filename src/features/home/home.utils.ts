import { DEFAULT_FILTER } from "~/features/home/home.constants";
import type { Recipe } from "~/features/recipe/recipe.types";

export function filterRecipesByCategory(
  recipes: Recipe[],
  categoryId?: string
) {
  if (!categoryId || categoryId === DEFAULT_FILTER) return recipes;
  return recipes.filter((recipe) => {
    return recipe.categories.find((c) => c.id === Number(categoryId));
  });
}
