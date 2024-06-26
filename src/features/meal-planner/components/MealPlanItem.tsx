import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import type { Swipeable } from "react-native-gesture-handler";

import Icon from "~/components/Icon";
import SwipeableRow from "~/components/SwipeableRow";
import Text from "~/components/Text";
import { colors } from "~/theme";
import { formatDistanceToNowInDays } from "~/utils/date";
import useDeleteMealPlan from "../hooks/useDeleteMealPlan";
import type { MealPlan } from "../mealPlanner.types";

function MealPlanItem({
  mealPlan,
  onPress,
}: {
  mealPlan: MealPlan;
  onPress: () => void;
}) {
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

  return (
    <SwipeableRow
      ref={swipeableRef}
      rightIcon="Trash2"
      rightStyle={styles.rightAction}
      onRightOpen={handleDeleteMealPlan}
      leftIcon="ShoppingCart"
      leftStyle={styles.leftAction}
      onLeftOpen={mealPlan.note ? undefined : handleNavigateToGroceriesSelect}
      onPress={onPress}
    >
      {mealPlan.note ? (
        <View className="bg-gray-100 dark:bg-gray-900 rounded-2xl py-4 px-4 flex-row gap-4">
          <Icon
            name="Notebook"
            className="text-gray-300 dark:text-gray-600"
            size={32}
          />
          <Text className="flex-1">{mealPlan.note}</Text>
        </View>
      ) : (
        <View className="flex-row lg:flex-col bg-gray-100 dark:bg-gray-900 rounded-2xl">
          <Image
            className="bg-primary w-24 h-full mr-4 rounded-l-2xl lg:h-24 lg:w-full lg:rounded-bl-none lg:rounded-t-2xl"
            source={recipe?.images?.[0]}
            placeholder="L086]0pHfQpHu2fQfQfQfQfQfQfQ"
          />
          <View className="flex-1 lg:flex-none pt-3 pb-4 lg:py-4 lg:px-4 mr-3">
            <Text numberOfLines={3} className="font-display text-lg mb-1">
              {recipe?.name}
            </Text>
            <Text className="font-body text-xs text-gray-600 dark:text-gray-300 mb-1">
              {recipe?.recipe_yield} servings | {recipe?.total_time}
            </Text>
            <Text className="font-body text-xs text-gray-600 dark:text-gray-300">
              {recipe?.last_cooked
                ? `Last made ${formatDistanceToNowInDays(
                    new Date(recipe?.last_cooked)
                  )}`
                : "New recipe!"}
            </Text>
          </View>
        </View>
      )}
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
