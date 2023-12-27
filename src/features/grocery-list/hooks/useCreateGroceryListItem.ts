import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroceryList } from "../groceryList.service";
import { GroceryListItem } from "../groceryList.types";

type Options = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

function useCreateGroceryListItem(options?: Options) {
  const queryClient = useQueryClient();

  const createGroceryListItemMutation = useMutation({
    mutationFn: (items: string[]) => createGroceryList(items),
    onMutate: async (items) => {
      await queryClient.cancelQueries(["groceryList"]);

      const previousItems = queryClient.getQueryData<GroceryListItem[]>([
        "groceryList",
      ]);

      queryClient.setQueryData(["groceryList"], (old: any) => [
        ...old,
        ...items.map((item) => ({ name: item })),
      ]);

      return { previousItems };
    },
    onSuccess: () => {
      options?.onSuccess?.();
    },
    onError: (error) => {
      console.error(error);
      options?.onError?.(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["groceryList"] });
    },
  });

  return createGroceryListItemMutation;
}

export default useCreateGroceryListItem;
