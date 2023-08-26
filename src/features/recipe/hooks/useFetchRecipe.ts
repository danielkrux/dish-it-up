import { Recipe } from "../../../../types/Recipe";
import { getRecipe } from "../recipe.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function useFetchRecipe(id?: string) {
  const queryClient = useQueryClient();
  const result = useQuery(["recipe", { id }], () => getRecipe(id as string), {
    initialData: () => {
      const recipes = queryClient.getQueryData<Recipe[]>([
        "recipes",
        undefined,
      ]);
      return recipes?.find((recipe) => recipe.id === id);
    },
  });

  return result;
}

export default useFetchRecipe;
