import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategory } from "../recipe.service";

type Options = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

function useDeleteCategory(options?: Options) {
  const queryClient = useQueryClient();

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"], { exact: false });
      options?.onSuccess?.();
    },
    onError: (error) => {
      console.error(error);
      options?.onError?.(error);
    },
  });

  return deleteCategoryMutation;
}

export default useDeleteCategory;
