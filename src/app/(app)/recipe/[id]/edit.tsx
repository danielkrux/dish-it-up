import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback } from "react";
import { ScrollView } from "react-native";
import Button from "~/components/Button";

import IconButton from "~/components/IconButton";
import RecipeForm from "~/features/recipe/components/RecipeForm";
import useFetchRecipe from "~/features/recipe/hooks/useFetchRecipe";
import useUpdateRecipe from "~/features/recipe/hooks/useUpdateRecipe";
import { parseIngredients } from "~/features/recipe/recipe.utils";
import useScrollingFormAvoidKeyBoard from "~/hooks/useScrollingFormAvoidKeyboard";
import theme from "~/theme";

export default function EditRecipe() {
	const { id } = useLocalSearchParams();
	const router = useRouter();

	const { data } = useFetchRecipe(Number(id));
	const { mutate } = useUpdateRecipe({
		onSuccess: () => router.back(),
	});

	useScrollingFormAvoidKeyBoard();

	const renderHeaderLeft = useCallback(
		() => (
			<IconButton
				onPress={() => router.back()}
				icon="chevron-left"
				size="medium"
			/>
		),
		[router],
	);

	// const renderHeaderRight = useCallback(
	// 	() => (
	// 		<Button
	// 			variant="secondary"
	// 			size="small"
	// 			onPress={() => router.back()}
	// 		>
	// 			Save
	// 		</Button>
	// 	),
	// 	[router],
	// );

	if (!data) return null;

	return (
		<ScrollView
			contentInsetAdjustmentBehavior="automatic"
			contentContainerStyle={{ padding: theme.spacing.m }}
		>
			<Stack.Screen
				options={{
					title: "Edit Recipe",
					headerLeft: renderHeaderLeft,
					// headerRight: renderHeaderRight,
				}}
			/>
			<RecipeForm
				initialRecipe={data}
				onSubmit={(recipeInputs) =>
					mutate({
						...data,
						...recipeInputs,
						ingredients: parseIngredients(recipeInputs.ingredients),
					})
				}
			/>
		</ScrollView>
	);
}
