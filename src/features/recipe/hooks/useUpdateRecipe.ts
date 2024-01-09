import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import recipeKeys from "../recipe.queryKeys";
import { updateRecipe } from "../recipe.service";
import { Recipe } from "../recipe.types";

function useUpdateRecipe({ onSuccess }: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  const updateRecipeMutation = useMutation({
    mutationFn: updateRecipe,
    onMutate: async (variables) => {
      await queryClient.cancelQueries(recipeKeys.detail(variables?.id));

      const previousRecipe = queryClient.getQueryData<Recipe>(
        recipeKeys.detail(variables?.id)
      );

      queryClient.setQueryData(recipeKeys.detail(variables?.id), () => ({
        ...previousRecipe,
        ...variables,
      }));

      return { previousRecipe };
    },
    onSuccess: () => {
      Toast.show({ text1: "Recipe updated!" });
      onSuccess?.();
    },
    onError: (error, variables, context) => {
      Toast.show({
        text1: "Something went wrong",
        type: "error",
      });
      queryClient.setQueryData(
        recipeKeys.detail(variables?.id),
        context?.previousRecipe
      );
      console.error(error);
    },
    onSettled: (_, error, variables) => {
      queryClient.invalidateQueries(recipeKeys.all);
    },
  });

  return updateRecipeMutation;
}

export default useUpdateRecipe;
