import { deleteRecipe } from "../recipe.service";
import { Recipe } from "../recipe.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Options = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

function useDeleteRecipe(id: number, options?: Options) {
  const queryClient = useQueryClient();
  const deleteRecipeMutation = useMutation({
    mutationFn: () => deleteRecipe(id),
    onSuccess: () => {
      const currentRecipes = queryClient.getQueryData<Recipe[]>(["recipes"]);
      queryClient.setQueryData(
        ["recipes"],
        currentRecipes?.filter((recipe: Recipe) => recipe.id !== id)
      );
      queryClient.invalidateQueries(["recipes"], { exact: false });
      options?.onSuccess?.();
    },
    onError: (error) => {
      console.error(error);
      options?.onError?.(error);
    },
  });

  return deleteRecipeMutation;
}

export default useDeleteRecipe;
