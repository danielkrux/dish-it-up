import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
	FlatList,
	ListRenderItemInfo,
	Platform,
	Pressable,
	StyleSheet,
	View,
} from "react-native";

import Button from "../../components/Button";
import Check from "../../components/Check";
import Text from "../../components/Text";
import { createMealPlan } from "../../features/meal-planner/mealPlanner.service";
import RecipeImageCard from "../../features/recipe/components/RecipeImageCard";
import { getRecipes } from "../../features/recipe/recipe.service";
import { Recipe } from "../../features/recipe/recipe.types";
import useSafeAreaInsets from "../../hooks/useSafeAreaInsets";
import theme from "../../theme";

function keyExtractor(recipe: Recipe) {
	return recipe.id.toString();
}

function SelectRecipe() {
	const insets = useSafeAreaInsets();
	const params = useLocalSearchParams<{ date: string }>();
	const date = new Date(params.date);
	const [selectedRecipes, setSelectedRecipes] = useState<number[]>([]);
	const queryClient = useQueryClient();

	const { data } = useQuery(["recipes"], () => getRecipes());

	const mutation = useMutation({
		mutationFn: () =>
			createMealPlan(
				selectedRecipes.map((id) => ({
					recipe_id: id,
					date: date.toDateString(),
				})),
			),
		onSettled: () => {
			queryClient.invalidateQueries(["meal-plans"]);
		},
	});

	function handleRecipePress(recipe: Recipe) {
		setSelectedRecipes((prev) => {
			if (prev.includes(recipe.id)) {
				return prev.filter((r) => r !== recipe.id);
			}
			return [...prev, recipe.id];
		});
	}

	function handleSave() {
		mutation.mutate();
		router.back();
	}

	function renderRecipe({ item }: ListRenderItemInfo<Recipe>) {
		return (
			<Pressable
				onPress={() => handleRecipePress(item)}
				className="flex-row justify-between items-center g-6"
			>
				<RecipeImageCard
					recipe={item}
					onPress={() => handleRecipePress(item)}
				/>
				<Check selected={selectedRecipes.includes(item.id)} />
			</Pressable>
		);
	}

	return (
		<>
			<Stack.Screen
				name="select-recipe"
				options={{
					presentation: "modal",
					headerShown: false,
					animation: Platform.select({
						android: "fade_from_bottom",
						ios: "default",
					}),
				}}
			/>
			<View className="flex-1 py-6">
				<FlatList
					data={data}
					renderItem={renderRecipe}
					keyExtractor={keyExtractor}
					contentContainerStyle={styles.recipeList}
					ListHeaderComponent={
						<Text type="header" size="xl">
							Select Recipes for {format(date, "EEEE")}
						</Text>
					}
				/>
				<Button
					style={{ bottom: insets.bottom }}
					className="absolute mx-4 left-0 right-0"
					onPress={handleSave}
					size="large"
				>
					Save
				</Button>
			</View>
		</>
	);
}

export default SelectRecipe;

const styles = StyleSheet.create({
	recipeList: {
		gap: theme.spacing.m,
		paddingHorizontal: theme.spacing.m,
		paddingBottom: 100,
	},
});
