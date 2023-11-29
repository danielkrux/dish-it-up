import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { groupBy } from "lodash";

import Text from "../../components/Text";
import theme from "../../theme";
import {
  addDays,
  eachDayOfInterval,
  format,
  lastDayOfWeek,
  subDays,
} from "date-fns";
import IconButton from "../../components/IconButton";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { fetchMealPlan } from "../../features/meal-planner/mealPlanner.service";
import RecipeImageCard from "../../features/recipe/components/RecipeImageCard";
import { Swipeable } from "react-native-gesture-handler";

function MealPlanner() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const router = useRouter();

  const lastDay = lastDayOfWeek(selectedDate, { weekStartsOn: 1 });
  const firstDay = subDays(lastDay, 6);

  const datesOfWeek = eachDayOfInterval({ start: firstDay, end: lastDay });

  const { data } = useQuery(["meal-plans"], () => fetchMealPlan(), {
    select: (data) => groupBy(data, (item) => item.date),
  });

  function handleSelectRecipe(date: Date) {
    //@ts-ignore
    router.push(`/select-recipe?date=${date.toISOString()}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.weekSwitcher}>
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
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.containerContent}
      >
        {datesOfWeek.map((date) => {
          const recipes = data?.[format(date, "yyyy-MM-dd")];

          return (
            <View style={styles.day}>
              <View style={styles.dayHeader}>
                <Text style={styles.dayName} type="header" size="xl">
                  {format(date, "EEEE")}
                </Text>
                <IconButton
                  onPress={() => handleSelectRecipe(date)}
                  icon="plus"
                />
              </View>
              <View style={styles.recipes}>
                {recipes?.map((item) => (
                  <RecipeImageCard key={item.id} recipeId={item.recipe_id} />
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
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  containerContent: {
    marginHorizontal: theme.spacing.m,
  },
  weekSwitcher: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: theme.spacing.m,
    marginHorizontal: theme.spacing.m,
  },
  day: {
    marginBottom: theme.spacing.l,
  },
  dayName: {},
  dayHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recipes: {
    gap: theme.spacing.m,
  },
});
