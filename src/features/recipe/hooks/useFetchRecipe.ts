import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRecipe } from "../recipe.service";
import { Recipe } from "../../../../types/Recipe";

function useFetchRecipe(id?: string) {
  const queryClient = useQueryClient();
  const result = useQuery(["recipe", { id }], () => getRecipe(id as string), {
    initialData: () =>
      queryClient.getQueryData<Recipe[]>(["recipes"])?.find((r) => r.id === id),
  });

  return result;
}

export default useFetchRecipe;
