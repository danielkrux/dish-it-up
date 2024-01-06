import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { deleteRecipe } from "../recipe.service";
import { Recipe } from "../recipe.types";

type Options = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

function useDeleteRecipe(id?: number, options?: Options) {
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
      Toast.show({ type: "success", text1: "Recipe deleted!" });
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
