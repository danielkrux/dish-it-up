import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigation } from "expo-router";
import { createRecipe } from "../recipe.service";

function useCreateRecipe() {
	const queryClient = useQueryClient();
	const navigation = useNavigation();

	const createRecipeMutation = useMutation({
		mutationFn: createRecipe,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["recipes"] });
			navigation.getParent()?.goBack();
		},
	});

	return createRecipeMutation;
}

export default useCreateRecipe;
