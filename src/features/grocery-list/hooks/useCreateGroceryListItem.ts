import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GROCERY_LIST_QUERY_KEY } from "~/features/app/app.constants";
import { Ingredient, IngredientCreate } from "~/features/recipe/recipe.types";
import { createGroceryList } from "../groceryList.service";
import { GroceryListItem } from "../groceryList.types";

type Options = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

function useCreateGroceryListItem(options?: Options) {
  const queryClient = useQueryClient();

  const createGroceryListItemMutation = useMutation({
    mutationFn: (items: (Ingredient | IngredientCreate)[]) =>
      createGroceryList(items),
    onMutate: async (items) => {
      await queryClient.cancelQueries([GROCERY_LIST_QUERY_KEY]);

      const previousItems = queryClient.getQueryData<GroceryListItem[]>([
        GROCERY_LIST_QUERY_KEY,
      ]);

      queryClient.setQueryData(
        [GROCERY_LIST_QUERY_KEY],
        [
          ...(previousItems ?? []),
          ...items.map((item) => ({ name: item.name })),
        ]
      );

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
      queryClient.invalidateQueries({ queryKey: [GROCERY_LIST_QUERY_KEY] });
    },
  });

  return createGroceryListItemMutation;
}

export default useCreateGroceryListItem;
