import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRecipeByIds } from "../recipe.service";
import { Recipe } from "../recipe.types";

function useFetchRecipes(ids?: number[]) {
  const queryClient = useQueryClient();

  const result = useQuery(["recipes"], () => getRecipeByIds(ids), {
    initialData: () => {
      const recipes = queryClient.getQueryData<Recipe[]>([
        "recipes",
        undefined,
      ]);
      return recipes?.filter((recipe) => ids?.includes(recipe.id));
    },
  });

  return result;
}

export default useFetchRecipes;
