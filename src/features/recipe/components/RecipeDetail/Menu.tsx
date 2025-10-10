import { useRouter } from "expo-router";

import { Button, ContextMenu, Host, Image, Submenu } from "@expo/ui/swift-ui";
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
      <ContextMenu>
        <ContextMenu.Trigger>
          <Host
            style={{ width: 35, height: 35, transform: [{ rotate: "90deg" }] }}
          >
            <Image systemName="ellipsis" color="black" />
          </Host>
        </ContextMenu.Trigger>
        <ContextMenu.Items>
          <Button systemImage="pencil" onPress={handleNavigateToEdit}>
            Edit
          </Button>
          <Button systemImage="cart">Add to groceries</Button>
          <Button
            systemImage="globe"
            onPress={() => Linking.openURL(data?.source_url ?? "")}
          >
            Visit website
          </Button>
          <Button
            systemImage="cart"
            onPress={() => router.push(`/recipes/${recipeId}/select-groceries`)}
          >
            On grocery list
          </Button>
          <Submenu button={<Button systemImage="book">Add to mealplan</Button>}>
            {nextSevenDays.map((day) => (
              <Button
                onPress={() =>
                  createMealPlanMutation.mutate([
                    { recipe_id: recipeId, date: day.toDateString() },
                  ])
                }
                key={day.toISOString()}
              >
                {formatRelativeWithoutTime(day)}
              </Button>
            ))}
          </Submenu>
          <Button systemImage="checkmark.circle" onPress={onShowLogRecipe}>
            Log recipe
          </Button>
          <Button
            role="destructive"
            systemImage="trash"
            onPress={deleteMutation.mutate}
          >
            Delete
          </Button>
        </ContextMenu.Items>
      </ContextMenu>
    </Host>
  );
}

export default RecipeDetailMenu;
