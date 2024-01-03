import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import { AvoidSoftInput } from "react-native-avoid-softinput";

import RecipeForm from "~/features/recipe/components/RecipeForm";
import { RecipeUpdate } from "~/features/recipe/recipe.types";
import theme from "~/theme";

type RecipeInputs = {
	name: string;
	description: string;
	recipe_yield: number;
	ingredients: string[];
	instructions: string[];
};

function AddRecipe() {
	const { control, handleSubmit, setValue, getValues, watch } =
		useForm<RecipeInputs>({
			defaultValues: {
				name: "",
				description: "",
				recipe_yield: 0,
				ingredients: ["", ""],
				instructions: [""],
			},
		});

	const onFocusEffect = useCallback(() => {
		AvoidSoftInput.setShouldMimicIOSBehavior(true);
		AvoidSoftInput.setEnabled(true);
		return () => {
			AvoidSoftInput.setEnabled(false);
			AvoidSoftInput.setShouldMimicIOSBehavior(false);
		};
	}, []);

	useFocusEffect(onFocusEffect);

	const onSubmit = (data: RecipeUpdate) => console.log(data);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<RecipeForm onSubmit={onSubmit} />
		</ScrollView>
	);
}

export default AddRecipe;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: theme.spacing.m,
		paddingVertical: theme.spacing.xl,
		gap: theme.spacing.s,
	},
});
