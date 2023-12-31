import { useQuery } from "@tanstack/react-query";
import {
	addDays,
	eachDayOfInterval,
	format,
	lastDayOfWeek,
	subDays,
} from "date-fns";
import { useRouter } from "expo-router";
import { groupBy } from "lodash";
import React, { useState } from "react";
import { View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import FloatingButton from "~/components/FloatingButton";

import IconButton from "~/components/IconButton";
import ScrollView from "~/components/ScrollView";
import Text from "~/components/Text";
import MealPlanItem from "~/features/meal-planner/components/MealPlanItem";
import { fetchMealPlan } from "~/features/meal-planner/mealPlanner.service";

function MealPlanner() {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const router = useRouter();

	const lastDay = lastDayOfWeek(selectedDate, { weekStartsOn: 1 });
	const firstDay = subDays(lastDay, 6);

	const datesOfWeek = eachDayOfInterval({ start: firstDay, end: lastDay });

	const { data } = useQuery(["meal-plans"], () => fetchMealPlan(), {
		select: (data) => groupBy(data, (item) => item.date),
	});

	const currentMealPlans = Object.values(data || {})
		.filter((_, index) => {
			const key = Object.keys(data || {})[index];
			const date = new Date(key);
			return date >= firstDay && date <= lastDay;
		})
		.flat();

	function handleSelectRecipe(date: Date) {
		//@ts-ignore
		router.push(`/meal-planner/select-recipe?date=${date.toISOString()}`);
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
					const mealPlans = data?.[format(date, "yyyy-MM-dd")];

					return (
						<Animated.View
							entering={FadeIn}
							exiting={FadeOut}
							key={date.toISOString()}
							className="mb-5"
						>
							<View className="flex-row justify-between items-center mb-2">
								<Text type="header" size="xl">
									{format(date, "EEEE")}
								</Text>
								<IconButton
									onPress={() => handleSelectRecipe(date)}
									icon="plus"
								/>
							</View>
							<View className="g-4">
								{mealPlans?.map((item) => (
									<MealPlanItem key={item.id} mealPlan={item} />
								))}
							</View>
						</Animated.View>
					);
				})}
			</ScrollView>
			<FloatingButton
				onPress={() =>
					router.push(
						//@ts-ignore
						`/meal-planner/grocery-list?ids=${currentMealPlans
							.map((mp) => mp.recipe_id)
							.join(",")}`,
					)
				}
			>
				Create Grocery List
			</FloatingButton>
		</View>
	);
}

export default MealPlanner;
