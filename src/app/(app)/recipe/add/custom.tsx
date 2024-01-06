import { Stack } from "expo-router";
import { useCallback } from "react";
import { FormProvider } from "react-hook-form";
import { View } from "react-native";
import Button from "~/components/Button";

import RecipeForm from "~/features/recipe/components/RecipeForm";
import useRecipeForm from "~/features/recipe/components/RecipeForm/useRecipeForm";

function AddRecipe() {
	const form = useRecipeForm();
	const { handleSubmit } = form;

	function handleSave() {
		handleSubmit((values) => {
			// return mutate({
			//   ...data,
			//   ...values,
			//   ingredients: parseIngredients(values.ingredients),
			//   instructions: values.instructions.map((i) => i.value),
			// });
		})();
	}

	const renderHeaderRight = useCallback(
		() => (
			<Button size="small" variant="secondary" onPress={handleSave}>
				Save
			</Button>
		),
		[],
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
