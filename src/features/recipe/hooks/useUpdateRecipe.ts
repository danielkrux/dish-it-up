import { updateRecipe } from "../recipe.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useUpdateRecipe({ onSuccess }: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  const updateRecipeMutation = useMutation({
    mutationFn: updateRecipe,
    onSuccess: ({ data }, variables) => {
      onSuccess?.();
      queryClient.setQueryData(["recipes", { id: variables?.id }], data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return updateRecipeMutation;
}

export default useUpdateRecipe;
