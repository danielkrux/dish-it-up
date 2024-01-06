import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { updateRecipe } from "../recipe.service";
import { Recipe } from "../recipe.types";

function useUpdateRecipe({ onSuccess }: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  const updateRecipeMutation = useMutation({
    mutationFn: updateRecipe,
    onMutate: async (variables) => {
      await queryClient.cancelQueries(["recipes", { id: variables?.id }]);

      const previousRecipe = queryClient.getQueryData<Recipe>([
        "recipes",
        { id: variables?.id },
      ]);

      queryClient.setQueryData(["recipes", { id: variables?.id }], () => ({
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
      queryClient.setQueryData(
        ["recipes", { id: variables?.id }],
        context?.previousRecipe
      );
      console.error(error);
    },
    onSettled: (_, error, variables) => {
      queryClient.invalidateQueries(["recipes", { id: variables?.id }]);
    },
  });

  return updateRecipeMutation;
}

export default useUpdateRecipe;
