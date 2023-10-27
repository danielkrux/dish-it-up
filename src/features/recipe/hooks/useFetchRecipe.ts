import { getRecipe } from "../recipe.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Recipe } from "../recipe.types";

function useFetchRecipe(id?: number) {
  const queryClient = useQueryClient();

  if (!id) throw new Error("id is required");

  const result = useQuery(["recipes", { id }], () => getRecipe(id), {
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
