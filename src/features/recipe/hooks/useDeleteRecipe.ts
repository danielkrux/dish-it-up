import { deleteRecipe } from "../recipe.service";
import { Recipe } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Options = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

function useDeleteRecipe(id: string, options?: Options) {
  const queryClient = useQueryClient();
  const deleteRecipeMutation = useMutation({
    mutationFn: () => deleteRecipe(id),
    onSuccess: () => {
      const currentRecipes = queryClient.getQueryData<Recipe[]>(["recipes"]);
      queryClient.setQueryData(
        ["recipes"],
        currentRecipes?.filter((recipe: Recipe) => recipe.id !== id)
      );
      queryClient.invalidateQueries(["recipe", id]);
      options?.onSuccess?.();
    },
    onError: (error) => {
      console.log(error);
      options?.onError?.(error);
    },
  });

  return deleteRecipeMutation;
}

export default useDeleteRecipe;
