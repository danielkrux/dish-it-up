import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import {
  Draggable,
  DraggableState,
  DropProvider,
} from "react-native-reanimated-dnd";
import Toast from "react-native-toast-message";

import FloatingButton from "~/components/FloatingButton";
import IconButton from "~/components/IconButton";
import ScrollView from "~/components/ScrollView";
import Text from "~/components/Text";
import { MEAL_PLAN_QUERY_KEY } from "~/features/app/app.constants";
import MealPlanAddMenu from "~/features/meal-planner/components/MealPlanAddMenu";
import MealPlanDropZone from "~/features/meal-planner/components/MealPlanDropZone";
import MealPlanItem from "~/features/meal-planner/components/MealPlanItem";
import MealPlanNoteModal from "~/features/meal-planner/components/MealPlanNoteModal";
import RecipeSelectDialog from "~/features/meal-planner/components/RecipeSelectDialog.web";
import {
  fetchMealPlan,
  updateMealPlanItem,
} from "~/features/meal-planner/mealPlanner.service";
import type { MealPlan } from "~/features/meal-planner/mealPlanner.types";
import recipeKeys from "~/features/recipe/recipe.queryKeys";
import { getRecipes } from "~/features/recipe/recipe.service";
import { isWeb } from "~/theme";

function MealPlanner() {
  const router = useRouter();

  const [selectedWeekDate, setSelectedWeekDate] = useState(new Date());
  const [selectedMealPlan, setSelectedMealPlan] = useState<MealPlan>();
  const [activeDrag, setActiveDrag] = useState<string | null>(null);

  const [dragState, setDragState] = useState<DraggableState>(
    DraggableState.IDLE,
  );

  const queryClient = useQueryClient();
  const moveMealPlan = useMutation({
    mutationFn: updateMealPlanItem,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [MEAL_PLAN_QUERY_KEY] }),
  });

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
        pathname: "/meal-planner",
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
      pathname: "/meal-planner",
      params: { date: date.toDateString(), note: "true" },
    });
  }

  function handleSelectMealPlan(date: Date, plan: MealPlan) {
    // setSelectedMealPlan(plan);
    // if (plan.note) {
    //   router.navigate({
    //     pathname: "/meal-planner",
    //     params: { date: date.toDateString(), note: "true" },
    //   });
    // }
    // if (plan.recipe_id) {
    //   router.navigate({
    //     pathname: "/recipes/[id]",
    //     params: { id: plan.recipe_id },
    //   });
    // }
  }

  return (
    <DropProvider>
      <>
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
          contentContainerClassName="mx-4 mr-6 lg:mx-8 pb-16 lg:mt-8 lg:flex-row lg:justify-between lg:gap-6"
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
                <MealPlanDropZone
                  isDragging={dragState === DraggableState.DRAGGING}
                  id={date.toISOString()}
                  onDrop={(item) => {
                    const { recipes: _, ...mealPlan } = item;
                    moveMealPlan.mutate({
                      ...mealPlan,
                      date: format(date, "yyyy-MM-dd"),
                    });
                    setDragState(DraggableState.IDLE);
                  }}
                >
                  {mealPlans?.map((item) => (
                    <Draggable
                      key={item.id}
                      data={item}
                      draggableId={item.id.toString()}
                      onDragStart={() => {
                        setActiveDrag(item.id.toString());
                        return setDragState(DraggableState.DRAGGING);
                      }}
                      onDragEnd={() => {
                        setActiveDrag(null);
                        return setDragState(DraggableState.IDLE);
                      }}
                      style={{
                        zIndex: activeDrag === item.id.toString() ? 999 : 1,
                      }}
                    >
                      <MealPlanItem
                        onPress={() => handleSelectMealPlan(date, item)}
                        mealPlan={item}
                      />
                    </Draggable>
                  ))}
                </MealPlanDropZone>
              </Animated.View>
            );
          })}
        </ScrollView>
        <FloatingButton useBottomTabsSafeArea onPress={handleCreateGroceryList}>
          Create Grocery List
        </FloatingButton>
      </>
      <RecipeSelectDialog />
      <MealPlanNoteModal
        onDismiss={() => {
          setSelectedMealPlan(undefined);
        }}
        initialMealPlan={selectedMealPlan}
      />
    </DropProvider>
  );
}

export default MealPlanner;
