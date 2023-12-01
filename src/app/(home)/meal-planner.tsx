import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { groupBy } from "lodash";
import { useRouter } from "expo-router";
import {
	addDays,
	eachDayOfInterval,
	format,
	lastDayOfWeek,
	subDays,
} from "date-fns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Text from "../../components/Text";
import theme, { pallettes } from "../../theme";
import IconButton from "../../components/IconButton";
import {
	deleteMealPlan,
	fetchMealPlan,
} from "../../features/meal-planner/mealPlanner.service";
import RecipeImageCard from "../../features/recipe/components/RecipeImageCard";
import SwipeableRow from "../../components/SwipeableRow";
import ScrollView from "../../components/ScrollView";

function MealPlanner() {
	const queryClient = useQueryClient();
	const [selectedDate, setSelectedDate] = useState(new Date());
	const router = useRouter();

	const lastDay = lastDayOfWeek(selectedDate, { weekStartsOn: 1 });
	const firstDay = subDays(lastDay, 6);

	const datesOfWeek = eachDayOfInterval({ start: firstDay, end: lastDay });

	const { data } = useQuery(["meal-plans"], () => fetchMealPlan(), {
		select: (data) => groupBy(data, (item) => item.date),
	});

	const deleteMutation = useMutation({
		mutationFn: (id: number) => deleteMealPlan(id),
		onSettled: () => {
			queryClient.invalidateQueries(["meal-plans"]);
		},
	});

	function handleSelectRecipe(date: Date) {
		//@ts-ignore
		router.push(`/select-recipe?date=${date.toISOString()}`);
	}

	function handleDeleteMealPlan(id: number) {
		deleteMutation.mutate(id);
	}

	return (
		<View className="flex-1">
			<View className="flex-row justify-between items-center m-4">
				<IconButton
					onPress={() => setSelectedDate(subDays(selectedDate, 7))}
					icon="chevron-left"
					size="small"
				/>
				<Text size="l">
					{format(firstDay, "d MMM")} - {format(lastDay, "d MMM")}
				</Text>
				<IconButton
					onPress={() => setSelectedDate(addDays(selectedDate, 7))}
					icon="chevron-right"
					size="small"
				/>
			</View>
			<ScrollView className="flex-1" contentContainerStyle="mx-4">
				{datesOfWeek.map((date) => {
					const recipes = data?.[format(date, "yyyy-MM-dd")];

					return (
						<View style={styles.day}>
							<View className="flex-row justify-between items-center mb-2">
								<Text type="header" size="xl">
									{format(date, "EEEE")}
								</Text>
								<IconButton
									onPress={() => handleSelectRecipe(date)}
									icon="plus"
								/>
							</View>
							<View style={styles.recipes}>
								{recipes?.map((item) => (
									<SwipeableRow
										key={item.id}
										rightStyle={styles.rightAction}
										rightIcon="trash-2"
										onRightOpen={() => handleDeleteMealPlan(item.id)}
										leftStyle={styles.leftAction}
										leftIcon="edit-2"
										onLeftOpen={() =>
											router.push(`/recipe/${item.recipe_id}/select-groceries`)
										}
									>
										<RecipeImageCard
											recipeId={item.recipe_id}
											onPress={() => router.push(`/recipe/${item.recipe_id}/`)}
										/>
									</SwipeableRow>
								))}
							</View>
						</View>
					);
				})}
			</ScrollView>
		</View>
	);
}

export default MealPlanner;

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
