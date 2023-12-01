import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGroceryListItem } from "../groceryList.service";
import { GroceryListItem, GroceryListItemUpdate } from "../groceryList.types";

type Options = {
	onSuccess?: () => void;
	onError?: (error: unknown) => void;
};

function useUpdateGroceryListItem(options?: Options) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (groceryItem: GroceryListItemUpdate) =>
			updateGroceryListItem(groceryItem),
		onMutate: async (newItem) => {
			queryClient.cancelQueries({ queryKey: ["groceryList"] });

			const previousGroceries = queryClient.getQueryData<GroceryListItem[]>([
				"groceryList",
			]);

			const index = previousGroceries?.findIndex(
				(item: any) => item.id === newItem.id,
			);

			if (typeof index === "undefined") return { previousGroceries };

			queryClient.setQueryData(["groceryList"], (old: any) => {
				const newArr = [
					...old.slice(0, index),
					newItem,
					...old.slice(index + 1),
				];
				return newArr.sort((a: GroceryListItem, b: GroceryListItem) => {
					if (a.completed > b.completed) {
						return 1;
					} else if (a.completed === b.completed) {
						if (a.completed_at && b.completed_at) {
							return new Date(b.completed_at).getTime() >
								new Date(a.completed_at).getTime()
								? -1
								: 1;
						} else {
							return a.id > b.id ? 1 : -1;
						}
					} else {
						return -1;
					}
				});
			});

			return { previousGroceries };
		},
		onError: (error, _, context) => {
			console.error(error);
			options?.onError?.(error);
			queryClient.setQueryData(["groceryList"], context?.previousGroceries);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["groceryList"] });
		},
		onSuccess: () => {
			options?.onSuccess?.();
		},
	});
}

export default useUpdateGroceryListItem;
