import { useMutation, useQueryClient } from "@tanstack/react-query";
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
      await queryClient.cancelQueries(["groceryList"]);

      const previousItems = queryClient.getQueryData<GroceryListItem[]>([
        "groceryList",
      ]);

      queryClient.setQueryData(
        ["groceryList"],
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
      queryClient.invalidateQueries({ queryKey: ["groceryList"] });
    },
  });

  return createGroceryListItemMutation;
}

export default useCreateGroceryListItem;
