import { useRouter } from "expo-router";

import { Button, Host, Image, Menu } from "@expo/ui/swift-ui";
import React from "react";
import { Linking } from "react-native";

import { useCreateMealPlan } from "~/features/meal-planner/hooks/useCreateMealPlan";
import useDeleteRecipe from "~/features/recipe/hooks/useDeleteRecipe";
import useFetchRecipe from "~/features/recipe/hooks/useFetchRecipe";
import { formatRelativeWithoutTime, getNextSevenDays } from "~/utils/date";

type RecipeDetailMenuProps = {
  recipeId: number;
  onDeleteSucces?: () => void;
  onAddToMealPlan?: () => void;
  onShowLogRecipe?: () => void;
};

function RecipeDetailMenu({
  recipeId,
  onDeleteSucces,
  onAddToMealPlan,
  onShowLogRecipe,
}: RecipeDetailMenuProps) {
  const router = useRouter();
  const { data } = useFetchRecipe(recipeId);
  const deleteMutation = useDeleteRecipe(recipeId, {
    onSuccess: onDeleteSucces,
  });
  const createMealPlanMutation = useCreateMealPlan({
    onCompleted: onAddToMealPlan,
  });

  const nextSevenDays = getNextSevenDays();

  function handleNavigateToEdit() {
    router.push({
      pathname: `/recipes/[id]/edit`,
      params: {
        id: recipeId,
      },
    });
  }

  return (
    <Host style={{ width: 35, height: 35 }}>
      <Menu label={<Image systemName="ellipsis" color="black" />}>
        <Button
          label="Edit"
          systemImage="pencil"
          onPress={handleNavigateToEdit}
        />
        <Button label="Add to groceries" systemImage="cart" />
        <Button
          label="Visit website"
          systemImage="globe"
          onPress={() => Linking.openURL(data?.source_url ?? "")}
        />
        <Button
          label="On grocery list"
          systemImage="cart"
          onPress={() => router.push(`/recipes/${recipeId}/select-groceries`)}
        />
        <Menu systemImage="book" label="Add to mealplan">
          {nextSevenDays.map((day) => (
            <Button
              label={formatRelativeWithoutTime(day)}
              onPress={() =>
                createMealPlanMutation.mutate([
                  { recipe_id: recipeId, date: day.toDateString() },
                ])
              }
              key={day.toISOString()}
            />
          ))}
        </Menu>
        <Button
          label="Log recipe"
          systemImage="checkmark.circle"
          onPress={onShowLogRecipe}
        />
        <Button
          label="Delete"
          role="destructive"
          systemImage="trash"
          onPress={deleteMutation.mutate}
        />
      </Menu>
    </Host>
  );
}

export default RecipeDetailMenu;
