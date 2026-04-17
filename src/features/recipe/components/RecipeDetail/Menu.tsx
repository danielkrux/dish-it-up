import { Stack, useRouter } from "expo-router";

import React from "react";
import { Alert, Linking } from "react-native";

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

  function handleDelete() {
    Alert.alert(
      "Delete recipe",
      "Are you sure you want to delete this recipe?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteMutation.mutate(),
        },
      ],
    );
  }

  return (
    <Stack.Toolbar placement="right">
      <Stack.Toolbar.Menu icon="ellipsis">
        <Stack.Toolbar.Menu inline>
          <Stack.Toolbar.MenuAction
            onPress={handleNavigateToEdit}
            icon="pencil"
          >
            Edit
          </Stack.Toolbar.MenuAction>
          <Stack.Toolbar.MenuAction
            icon="globe"
            onPress={() => Linking.openURL(data?.source_url ?? "")}
          >
            Visit website
          </Stack.Toolbar.MenuAction>
          <Stack.Toolbar.MenuAction
            icon="cart"
            onPress={() => router.push(`/recipes/${recipeId}/select-groceries`)}
          >
            Add to groceries
          </Stack.Toolbar.MenuAction>
          <Stack.Toolbar.MenuAction
            icon="checkmark.circle"
            onPress={onShowLogRecipe}
          >
            Log recipe
          </Stack.Toolbar.MenuAction>
        </Stack.Toolbar.Menu>
        <Stack.Toolbar.Menu title="Add to mealplan" icon="book">
          {nextSevenDays.map((day) => (
            <Stack.Toolbar.MenuAction
              onPress={() =>
                createMealPlanMutation.mutate([
                  { recipe_id: recipeId, date: day.toDateString() },
                ])
              }
              key={day.toISOString()}
            >
              {formatRelativeWithoutTime(day)}
            </Stack.Toolbar.MenuAction>
          ))}
        </Stack.Toolbar.Menu>
        <Stack.Toolbar.Menu inline>
          <Stack.Toolbar.MenuAction
            icon="trash"
            onPress={handleDelete}
            destructive
          >
            Delete
          </Stack.Toolbar.MenuAction>
        </Stack.Toolbar.Menu>
      </Stack.Toolbar.Menu>
    </Stack.Toolbar>
  );
}

export default RecipeDetailMenu;
