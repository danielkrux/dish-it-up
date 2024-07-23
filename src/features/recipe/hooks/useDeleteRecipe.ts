import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import { deleteRecipe } from "../recipe.service";
import type { Recipe } from "../recipe.types";

type Options = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

function useDeleteRecipe(id?: number, options?: Options) {
  const queryClient = useQueryClient();
  const deleteRecipeMutation = useMutation({
    mutationFn: () => deleteRecipe(id),
    onMutate: async () => {
      await queryClient.cancelQueries(["recipes"]);
      const previousRecipes = queryClient.getQueryData<Recipe[]>(["recipes"]);
      queryClient.setQueryData(
        ["recipes"],
        previousRecipes?.filter((recipe: Recipe) => recipe.id !== id)
      );
      return { previousRecipes };
    },
    onSuccess: () => {
      Toast.show({ type: "success", text1: "Recipe deleted!" });
      options?.onSuccess?.();
    },
    onError: (error, _, context) => {
      console.error(error);
      options?.onError?.(error);
      queryClient.setQueryData(["recipes"], context?.previousRecipes);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["recipes"]);
    },
  });

  return deleteRecipeMutation;
}

export default useDeleteRecipe;
