import { useRouter } from "expo-router";

import { Button, Menu, Host, Image } from "@expo/ui/swift-ui";
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
      <Menu
        label={
          <Host
            style={{ width: 35, height: 35, transform: [{ rotate: "90deg" }] }}
          >
            <Image systemName="ellipsis" color="black" />
          </Host>
        }
      >
        <Button systemImage="pencil" onPress={handleNavigateToEdit} label="Edit" />
        <Button systemImage="cart" label="Add to groceries" />
        <Button
          systemImage="globe"
          onPress={() => Linking.openURL(data?.source_url ?? "")}
          label="Visit website"
        />
        <Button
          systemImage="cart"
          onPress={() => router.push(`/recipes/${recipeId}/select-groceries`)}
          label="On grocery list"
        />
        <Menu label="Add to mealplan" systemImage="book">
          {nextSevenDays.map((day) => (
            <Button
              onPress={() =>
                createMealPlanMutation.mutate([
                  { recipe_id: recipeId, date: day.toDateString() },
                ])
              }
              key={day.toISOString()}
              label={formatRelativeWithoutTime(day)}
            />
          ))}
        </Menu>
        <Button systemImage="checkmark.circle" onPress={onShowLogRecipe} label="Log recipe" />
        <Button
          role="destructive"
          systemImage="trash"
          onPress={deleteMutation.mutate}
          label="Delete"
        />
      </Menu>
    </Host>
  );
}

export default RecipeDetailMenu;
