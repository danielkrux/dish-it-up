import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGroceryListItem } from "../groceryList.service";
import { GroceryListItem } from "../groceryList.types";

type Options = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

const QUERY_KEY = "groceryList";

function useDeleteGroceryItems(options?: Options) {
  const queryClient = useQueryClient();
  const deleteRecipeMutation = useMutation({
    mutationFn: (ids: number[]) => deleteGroceryListItem(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries([QUERY_KEY]);

      const previousItems = queryClient.getQueryData<GroceryListItem[]>([
        QUERY_KEY,
      ]);

      queryClient.setQueryData<GroceryListItem[]>([QUERY_KEY], (old) =>
        old?.filter((item) => !ids.includes(item.id))
      );

      return { previousItems };
    },
    onSuccess: () => {
      options?.onSuccess?.();
    },
    onError: (error, _, context) => {
      console.error(error);
      options?.onError?.(error);
      queryClient.setQueryData([QUERY_KEY], context?.previousItems);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });

  return deleteRecipeMutation;
}

export default useDeleteGroceryItems;
