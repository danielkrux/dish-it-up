import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CATEGORIES_QUERY_KEY } from "~/features/app/app.constants";
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
      queryClient.invalidateQueries([CATEGORIES_QUERY_KEY], { exact: false });
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
