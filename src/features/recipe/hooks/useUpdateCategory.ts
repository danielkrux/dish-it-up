import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CATEGORIES_QUERY_KEY } from "~/features/app/app.constants";
import { editCategory } from "../recipe.service";

function useUpdateCategory() {
  const queryClient = useQueryClient();

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, name }: { id: number; name?: string | null }) =>
      editCategory(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries([CATEGORIES_QUERY_KEY], { exact: false });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return updateCategoryMutation;
}

export default useUpdateCategory;
