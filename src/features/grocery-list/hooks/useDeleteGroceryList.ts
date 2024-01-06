import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GROCERY_LIST_QUERY_KEY } from "~/features/app/app.constants";
import { deleteGroceryListItem } from "../groceryList.service";
import { GroceryListItem } from "../groceryList.types";

type Options = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

function useDeleteGroceryItems(options?: Options) {
  const queryClient = useQueryClient();
  const deleteRecipeMutation = useMutation({
    mutationFn: (ids: number[]) => deleteGroceryListItem(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries([GROCERY_LIST_QUERY_KEY]);

      const previousItems = queryClient.getQueryData<GroceryListItem[]>([
        GROCERY_LIST_QUERY_KEY,
      ]);

      queryClient.setQueryData<GroceryListItem[]>(
        [GROCERY_LIST_QUERY_KEY],
        (old) => old?.filter((item) => !ids.includes(item.id))
      );

      return { previousItems };
    },
    onSuccess: () => {
      options?.onSuccess?.();
    },
    onError: (error, _, context) => {
      console.error(error);
      options?.onError?.(error);
      queryClient.setQueryData(
        [GROCERY_LIST_QUERY_KEY],
        context?.previousItems
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [GROCERY_LIST_QUERY_KEY] });
    },
  });

  return deleteRecipeMutation;
}

export default useDeleteGroceryItems;
