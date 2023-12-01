import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../recipe.service";

function useCreateCategory() {
	const queryClient = useQueryClient();

	const createCategoryMutation = useMutation({
		mutationFn: (name?: string) => createCategory(name),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
		onError: (error) => {
			console.error(error);
		},
	});

	return createCategoryMutation;
}

export default useCreateCategory;
