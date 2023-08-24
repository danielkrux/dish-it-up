import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRecipe } from "../recipe.service";

function useUpdateRecipe({ onSuccess }: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  const updateRecipeMutation = useMutation({
    mutationFn: updateRecipe,
    onSuccess: ({ data }, variables) => {
      onSuccess?.();
      queryClient.setQueryData(["recipe", { id: variables?.id }], data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return updateRecipeMutation;
}

export default useUpdateRecipe;
