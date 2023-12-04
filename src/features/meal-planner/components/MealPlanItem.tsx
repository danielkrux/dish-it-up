import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

import SwipeableRow from "~/components/SwipeableRow";
import Text from "~/components/Text";
import theme, { pallettes } from "~/theme";
import { deleteMealPlan } from "../mealPlanner.service";
import { MealPlan } from "../mealPlanner.types";

function MealPlanItem({ mealPlan }: { mealPlan: MealPlan }) {
	const queryClient = useQueryClient();
	const router = useRouter();
	const swipeableRef = useRef<Swipeable>(null);
	const recipe = mealPlan.recipes;

	const deleteMutation = useMutation({
		mutationFn: (id: number) => deleteMealPlan(id),
		onMutate: (id) => {
			queryClient.cancelQueries(["meal-plans"]);
			const previousItems = queryClient.getQueryData<MealPlan[]>([
				"meal-plans",
			]);
			queryClient.setQueryData<MealPlan[]>(["meal-plans"], (old) => {
				return old?.filter((mealPlan) => mealPlan.id !== id) ?? [];
			});
			return { previousItems };
		},
		onError: (error, _, context) => {
			console.error(error);
			queryClient.setQueryData(["meal-plans"], context?.previousItems);
		},
		onSettled: () => {
			swipeableRef.current?.close();
			queryClient.invalidateQueries(["meal-plans"]);
		},
	});

	function handleDeleteMealPlan() {
		deleteMutation.mutate(mealPlan.id);
	}

	function handleGoToGroceriesSelect() {
		router.push(`/recipe/${mealPlan.recipe_id}/select-groceries`);
		setTimeout(() => {
			swipeableRef.current?.close();
		}, 1000);
	}

	function handleNavigateToRecipe() {
		router.push(`/recipe/${mealPlan.recipe_id}/`);
	}

	return (
		<SwipeableRow
			ref={swipeableRef}
			rightStyle={styles.rightAction}
			rightIcon="trash-2"
			onRightOpen={handleDeleteMealPlan}
			leftStyle={styles.leftAction}
			leftIcon="edit-2"
			onLeftOpen={handleGoToGroceriesSelect}
			onPress={handleNavigateToRecipe}
		>
			<View className="flex-row bg-white rounded-2xl">
				{recipe?.image_url && (
					<Image
						className="w-24 aspect-square mr-4 rounded-2xl"
						source={{ uri: recipe?.image_url }}
					/>
				)}
				<View className="flex-1">
					<Text type="header" size="l">
						{recipe?.name}
					</Text>
				</View>
			</View>
		</SwipeableRow>
	);
}

export default MealPlanItem;

const styles = StyleSheet.create({
	rightAction: {
		backgroundColor: pallettes.red[100],
	},
	leftAction: {
		backgroundColor: theme.colors.primary,
	},
});
