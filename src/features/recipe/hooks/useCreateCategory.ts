import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CATEGORIES_QUERY_KEY } from "~/features/app/app.constants";
import { createCategory } from "../recipe.service";

function useCreateCategory() {
  const queryClient = useQueryClient();

  const createCategoryMutation = useMutation({
    mutationFn: (name?: string) => createCategory(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return createCategoryMutation;
}

export default useCreateCategory;
