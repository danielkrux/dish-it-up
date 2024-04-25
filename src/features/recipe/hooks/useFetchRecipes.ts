import { useQuery, useQueryClient } from "@tanstack/react-query";
import recipeKeys from "../recipe.queryKeys";
import { getRecipeByIds } from "../recipe.service";
import { Recipe } from "../recipe.types";

function useFetchRecipes(ids?: number[]) {
  const queryClient = useQueryClient();

  const recipes = queryClient.getQueryData<Recipe[]>(recipeKeys.all, {
    exact: false,
  });

  const result = useQuery(recipeKeys.mealPlan(), () => getRecipeByIds(ids), {
    initialData: () => recipes?.filter((recipe) => ids?.includes(recipe.id)),
  });

  return result;
}

export default useFetchRecipes;
