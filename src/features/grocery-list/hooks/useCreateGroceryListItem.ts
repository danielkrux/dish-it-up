import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroceryList } from "../groceryList.service";

type Options = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

function useCreateGroceryListItem(options?: Options) {
  const queryClient = useQueryClient();

  const createGroceryListItemMutation = useMutation({
    mutationFn: (items: string[]) => createGroceryList(items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groceryList"] });
      options?.onSuccess?.();
    },
    onError: (error) => {
      console.error(error);
      options?.onError?.(error);
    },
  });

  return createGroceryListItemMutation;
}

export default useCreateGroceryListItem;
