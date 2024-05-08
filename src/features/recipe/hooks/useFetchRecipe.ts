import { useQuery, useQueryClient } from "@tanstack/react-query";
import recipeKeys from "../recipe.queryKeys";
import { getRecipe } from "../recipe.service";
import { Recipe } from "../recipe.types";

function useFetchRecipe(id?: number) {
  const queryClient = useQueryClient();

  const result = useQuery(recipeKeys.detail(id), () => getRecipe(id), {
    enabled: !!id,
    initialData: () => {
      const recipes = queryClient.getQueryData<Recipe[]>(recipeKeys.list());
      return recipes?.find((recipe) => recipe.id === id);
    },
  });

  return result;
}

export default useFetchRecipe;
