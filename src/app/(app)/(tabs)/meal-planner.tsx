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
import { Platform, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import Toast from "react-native-toast-message";

import FloatingButton from "~/components/FloatingButton";
import IconButton from "~/components/IconButton";
import ScrollView from "~/components/ScrollView";
import Text from "~/components/Text";
import { MEAL_PLAN_QUERY_KEY } from "~/features/app/app.constants";
import MealPlanAddMenu from "~/features/meal-planner/components/MealPlanAddMenu";
import MealPlanItem from "~/features/meal-planner/components/MealPlanItem";
import MealPlanNoteModal from "~/features/meal-planner/components/MealPlanNoteModal";
import RecipeSelectDialog from "~/features/meal-planner/components/RecipeSelectDialog.web";
import { fetchMealPlan } from "~/features/meal-planner/mealPlanner.service";
import type { MealPlan } from "~/features/meal-planner/mealPlanner.types";
import recipeKeys from "~/features/recipe/recipe.queryKeys";
import { getRecipes } from "~/features/recipe/recipe.service";
import { isWeb } from "~/theme";

function MealPlanner() {
  const [selectedWeekDate, setSelectedWeekDate] = useState(new Date());
  const [selectedMealPlan, setSelectedMealPlan] = useState<MealPlan>();
  const router = useRouter();

  const lastDay = lastDayOfWeek(selectedWeekDate, { weekStartsOn: 1 });
  const firstDay = subDays(lastDay, 6);

  const datesOfWeek = eachDayOfInterval({ start: firstDay, end: lastDay });

  const { data: recipes } = useQuery(recipeKeys.all, () => getRecipes());

  const { data } = useQuery([MEAL_PLAN_QUERY_KEY], fetchMealPlan, {
    select: (data) => groupBy(data, (item) => item.date),
  });

  const currentMealPlans = Object.values(data || {})
    .filter((_, index) => {
      const key = Object.keys(data || {})[index];
      const date = new Date(key);
      return date >= firstDay && date <= lastDay;
    })
    .flat();

  function handleCreateGroceryList() {
    const currentMealPlansIds = currentMealPlans
      .filter((mp) => mp.recipe_id)
      .map((mp) => mp.recipe_id)
      .join(",");

    if (!currentMealPlansIds) {
      return Toast.show({
        type: "error",
        text1: "No meal plans found",
        text2: "Please add some meal plans to create a grocery list",
      });
    }

    router.navigate(`/meal-planner/grocery-list?ids=${currentMealPlansIds}`);
  }

  function handleSelectRecipe(date: Date) {
    if (!recipes?.length) {
      return Toast.show({
        type: "error",
        text1: "No recipes found",
        text2: "Please add some recipes to select one",
      });
    }

    if (isWeb) {
      return router.navigate({
        pathname: "/meal-planner/",
        params: { date: date.toDateString(), note: "false" },
      });
    }

    router.navigate({
      pathname: "/meal-planner/select-recipe",
      params: { date: date.toDateString() },
    });
  }

  function handleSelectNote(date: Date) {
    router.navigate({
      pathname: "/meal-planner/",
      params: { date: date.toDateString(), note: "true" },
    });
  }

  function handleSelectMealPlan(date: Date, plan: MealPlan) {
    setSelectedMealPlan(plan);
    if (plan.note) {
      router.navigate({
        pathname: "/meal-planner/",
        params: { date: date.toDateString(), note: "true" },
      });
    } else {
      router.navigate(`/recipe/${plan.recipe_id}/`);
    }
  }

  return (
    <>
      <View className="flex-1">
        <View className="flex-row justify-between items-center m-4 md:mx-8">
          <IconButton
            onPress={() => setSelectedWeekDate(subDays(selectedWeekDate, 7))}
            icon="ChevronLeft"
            size="medium"
          />
          <Text size="l">
            {format(firstDay, "d MMM")} - {format(lastDay, "d MMM")}
          </Text>
          <IconButton
            onPress={() => setSelectedWeekDate(addDays(selectedWeekDate, 7))}
            icon="ChevronRight"
            size="medium"
          />
        </View>
        <ScrollView
          className="flex-1"
          contentContainerClassName="mx-4 lg:mx-8 pb-16 lg:mt-8 lg:flex-row lg:justify-between lg:gap-6"
        >
          {datesOfWeek.map((date) => {
            const mealPlans = data?.[format(date, "yyyy-MM-dd")];

            return (
              <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                key={date.toISOString()}
                className="mb-5 lg:w-[170px] 2xl:w-[220px]"
              >
                <View className="flex-row justify-between items-center mb-2">
                  <Text type="header" size="xl">
                    {format(date, "EEEE")}
                  </Text>
                  <MealPlanAddMenu
                    onSelectNote={() => handleSelectNote(date)}
                    onSelectRecipe={() => handleSelectRecipe(date)}
                  />
                </View>
                <View className="gap-4">
                  {mealPlans?.map((item) => (
                    <MealPlanItem
                      onPress={() => handleSelectMealPlan(date, item)}
                      key={item.id}
                      mealPlan={item}
                    />
                  ))}
                </View>
              </Animated.View>
            );
          })}
        </ScrollView>
        <FloatingButton onPress={handleCreateGroceryList}>
          Create Grocery List
        </FloatingButton>
      </View>
      <RecipeSelectDialog />
      <MealPlanNoteModal
        onDismiss={() => {
          setSelectedMealPlan(undefined);
        }}
        initialMealPlan={selectedMealPlan}
      />
    </>
  );
}

export default MealPlanner;
