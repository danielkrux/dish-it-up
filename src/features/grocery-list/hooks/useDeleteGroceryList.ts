import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GroceryListItem } from "../groceryList.types";
import { deleteGroceryListItem } from "../groceryList.service";

type Options = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

function useDeleteGroceryItems(options?: Options) {
  const queryClient = useQueryClient();
  const deleteRecipeMutation = useMutation({
    mutationFn: (ids: number[]) => deleteGroceryListItem(ids),
    onMutate: async (ids) => {
      await queryClient.cancelQueries(["groceryList"]);

      const previousItems = queryClient.getQueryData<GroceryListItem[]>([
        "groceryList",
      ]);

      queryClient.setQueryData(["groceryList"], (old: any) => {
        const newArr = old.filter((item: GroceryListItem) => {
          return !ids.includes(item.id);
        });
        return newArr;
      });

      queryClient.invalidateQueries(["groceryList"], { exact: false });

      return { previousItems };
    },
    onSuccess: () => {
      options?.onSuccess?.();
    },
    onError: (error, _, context) => {
      console.error(error);
      options?.onError?.(error);
      queryClient.setQueryData(["groceryList"], context?.previousItems);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["groceryList"] });
    },
  });

  return deleteRecipeMutation;
}

export default useDeleteGroceryItems;
