import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRecipe } from "../recipe.service";

function useUpdateRecipe({ onSuccess }: { onSuccess?: () => void }) {
	const queryClient = useQueryClient();

	const updateRecipeMutation = useMutation({
		mutationFn: updateRecipe,
		onSuccess: async ({ data }, variables) => {
			queryClient.invalidateQueries(["recipes", { id: variables?.id }]);
			onSuccess?.();
			// queryClient.setQueryData(["recipes", { id: variables?.id }], data);
		},
		onError: (error) => {
			console.error(error);
		},
	});

	return updateRecipeMutation;
}

export default useUpdateRecipe;
