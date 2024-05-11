import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

import SwipeableRow from "~/components/SwipeableRow";
import Text from "~/components/Text";
import { colors } from "~/theme";
import { formatDistanceToNowInDays } from "~/utils/date";
import useDeleteMealPlan from "../hooks/useDeleteMealPlan";
import { MealPlan } from "../mealPlanner.types";

function MealPlanItem({ mealPlan }: { mealPlan: MealPlan }) {
  const router = useRouter();
  const swipeableRef = useRef<Swipeable>(null);
  const recipe = mealPlan.recipes;

  const deleteMutation = useDeleteMealPlan({
    onSettled: () => swipeableRef.current?.close(),
  });

  function handleDeleteMealPlan() {
    deleteMutation.mutate(mealPlan.id);
  }

  function handleNavigateToGroceriesSelect() {
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
      rightIcon="Trash2"
      rightStyle={styles.rightAction}
      onRightOpen={handleDeleteMealPlan}
      leftIcon="ShoppingCart"
      leftStyle={styles.leftAction}
      onLeftOpen={handleNavigateToGroceriesSelect}
      onPress={handleNavigateToRecipe}
    >
      <View className="flex-row lg:flex-col bg-gray-100 dark:bg-gray-900 rounded-2xl">
        <Image
          className="w-24 h-full mr-4 rounded-l-2xl lg:h-24 lg:w-full lg:rounded-bl-none lg:rounded-t-2xl"
          source={recipe?.images?.[0]}
          placeholder="L086]0pHfQpHu2fQfQfQfQfQfQfQ"
        />
        <View className="flex-1 lg:flex-none py-2 lg:py-4 lg:px-4 mr-3">
          <Text numberOfLines={3} className="font-display text-base mb-1">
            {recipe?.name}
          </Text>
          <Text className="font-body text-xs text-gray-600 dark:text-gray-300 mb-2">
            {recipe?.recipe_yield} servings | {recipe?.total_time}
          </Text>
          <Text className="font-body text-xs text-gray-800 dark:text-gray-300">
            {recipe?.last_cooked
              ? `Last made ${formatDistanceToNowInDays(
                  new Date(recipe?.last_cooked)
                )}`
              : "New recipe!"}
          </Text>
        </View>
      </View>
    </SwipeableRow>
  );
}

export default MealPlanItem;

const styles = StyleSheet.create({
  rightAction: {
    backgroundColor: colors.red[100],
  },
  leftAction: {
    backgroundColor: colors.primary[400],
  },
});
