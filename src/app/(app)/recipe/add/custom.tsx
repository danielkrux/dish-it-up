import { Stack } from "expo-router";
import { useCallback } from "react";
import { FormProvider } from "react-hook-form";
import { View } from "react-native";

import Button from "~/components/Button";
import RecipeForm from "~/features/recipe/components/RecipeForm";
import useRecipeForm from "~/features/recipe/components/RecipeForm/useRecipeForm";
import useCreateRecipe from "~/features/recipe/hooks/useCreateRecipe";
import { parseIngredients } from "~/features/recipe/recipe.utils";

function AddRecipe() {
	const form = useRecipeForm();
	const { handleSubmit } = form;

	const { mutate, isLoading } = useCreateRecipe();

	function handleSave() {
		handleSubmit((values) => {
			return mutate({
				...values,
				categories: values.categories ?? [],
				ingredients: parseIngredients(values.ingredients),
				instructions: values.instructions.map((i) => i.value),
			});
		})();
	}

	const renderHeaderRight = useCallback(
		() => (
			<Button
				loading={isLoading}
				size="small"
				variant="secondary"
				onPress={handleSave}
			>
				Save
			</Button>
		),
		[isLoading],
	);

	return (
		<FormProvider {...form}>
			<Stack.Screen
				options={{
					title: "Create Recipe",
					headerRight: renderHeaderRight,
				}}
			/>
			<View className="mt-4">
				<RecipeForm />
			</View>
		</FormProvider>
	);
}

export default AddRecipe;
