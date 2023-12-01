import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import SwipeableRow from "../../../components/SwipeableRow";
import Text from "../../../components/Text";
import theme, { pallettes } from "../../../theme";
import { deleteMealPlan } from "../mealPlanner.service";
import { MealPlan } from "../mealPlanner.types";

function MealPlanItem({ mealPlan }: { mealPlan: MealPlan }) {
	const queryClient = useQueryClient();
	const router = useRouter();
	const swipeableRef = useRef<Swipeable>(null);
	const recipe = mealPlan.recipes;

	const deleteMutation = useMutation({
		mutationFn: (id: number) => deleteMealPlan(id),
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

	return (
		<SwipeableRow
			ref={swipeableRef}
			rightStyle={styles.rightAction}
			rightIcon="trash-2"
			onRightOpen={handleDeleteMealPlan}
			leftStyle={styles.leftAction}
			leftIcon="edit-2"
			onLeftOpen={handleGoToGroceriesSelect}
		>
			<View className="flex-row bg-white rounded-2xl">
				{recipe?.image_url && (
					<Image
						className="w-24 aspect-square mr-4 rounded-2xl"
						source={{ uri: recipe?.image_url }}
					/>
				)}
				<View>
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
	day: {
		marginBottom: theme.spacing.l,
	},
	recipes: {
		gap: theme.spacing.m,
	},
	rightAction: {
		backgroundColor: pallettes.red[100],
	},
	leftAction: {
		backgroundColor: theme.colors.primary,
	},
});
