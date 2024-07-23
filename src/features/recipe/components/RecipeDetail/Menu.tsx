import { useRouter } from "expo-router";
import React from "react";
import { Linking } from "react-native";
import * as Menu from "zeego/dropdown-menu";

import IconButton from "~/components/IconButton";
import {
  formatRelativeWithoutTime,
  getNextSevenDays,
} from "../../../../utils/date";
import { useCreateMealPlan } from "../../../meal-planner/hooks/useCreateMealPlan";
import useDeleteRecipe from "../../hooks/useDeleteRecipe";
import useFetchRecipe from "../../hooks/useFetchRecipe";

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

  return (
    <Menu.Root>
      <Menu.Trigger>
        <IconButton size="medium" icon="EllipsisVertical" />
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item
          key="edit"
          onSelect={() => router.push(`/recipe/${recipeId}/edit`)}
        >
          <Menu.ItemTitle>Edit</Menu.ItemTitle>
        </Menu.Item>
        <Menu.Group>
          <Menu.Item key="cooked" onSelect={onShowLogRecipe}>
            <Menu.ItemIcon ios={{ name: "checkmark.circle" }} />
            <Menu.ItemTitle>Log recipe</Menu.ItemTitle>
          </Menu.Item>
          <Menu.Item
            key="add-to-grocery-list"
            onSelect={() => router.push(`/recipe/${recipeId}/select-groceries`)}
          >
            <Menu.ItemIcon ios={{ name: "cart" }} />
            <Menu.ItemTitle>Add to groceries</Menu.ItemTitle>
          </Menu.Item>
          {data?.source_url && (
            <Menu.Item
              key="visit-website"
              onSelect={() => Linking.openURL(data.source_url ?? "")}
            >
              <Menu.ItemIcon ios={{ name: "globe" }} />
              <Menu.ItemTitle>Visit website</Menu.ItemTitle>
            </Menu.Item>
          )}
          <Menu.Sub>
            <Menu.SubTrigger key="plan">
              <Menu.ItemTitle>Add to mealplan</Menu.ItemTitle>
              <Menu.ItemIcon ios={{ name: "book" }} />
            </Menu.SubTrigger>
            <Menu.SubContent>
              {nextSevenDays.map((day) => (
                <Menu.Item
                  onSelect={() =>
                    createMealPlanMutation.mutate([
                      { recipe_id: recipeId, date: day.toDateString() },
                    ])
                  }
                  key={day.toISOString()}
                >
                  <Menu.ItemTitle>
                    {formatRelativeWithoutTime(day)}
                  </Menu.ItemTitle>
                </Menu.Item>
              ))}
            </Menu.SubContent>
          </Menu.Sub>
        </Menu.Group>
        <Menu.Item key="delete" onSelect={deleteMutation.mutate} destructive>
          <Menu.ItemIcon ios={{ name: "trash" }} />
          <Menu.ItemTitle>Delete</Menu.ItemTitle>
        </Menu.Item>
      </Menu.Content>
    </Menu.Root>
  );
}

export default RecipeDetailMenu;
