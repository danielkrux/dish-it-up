import { Link } from "expo-router";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ContextMenu/ContextMenu.web";
import Icon from "~/components/Icon";
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

export default function Menu({
  recipeId,
  onDeleteSucces,
  onAddToMealPlan,
}: RecipeDetailMenuProps) {
  const { data } = useFetchRecipe(recipeId);
  const { mutate } = useDeleteRecipe(recipeId, {
    onSuccess: onDeleteSucces,
  });

  const createMealPlanMutation = useCreateMealPlan({
    onCompleted: onAddToMealPlan,
  });

  const nextSevenDays = getNextSevenDays();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IconButton
          size="medium"
          icon="EllipsisVertical"
          testID="recipe-detail-menu"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/recipe/${recipeId}/edit`}>
            <Icon name="Pencil" size={16} className="mr-2" />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {}}>
          <Icon name="Star" size={16} className="mr-2" />
          Log Recipe
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/recipe/${recipeId}/select-groceries`}>
            <Icon name="ShoppingCart" size={16} className="mr-2" />
            Add to grocery list
          </Link>
        </DropdownMenuItem>
        {data?.source_url && (
          <DropdownMenuItem asChild>
            <a target="_blank" href={data?.source_url} rel="noreferrer">
              <Icon name="Globe" size={16} className="mr-2" />
              Open website
            </a>
          </DropdownMenuItem>
        )}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Icon name="Book" size={16} className="mr-2" />
            Add to meal plan
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {nextSevenDays.map((day) => (
                <DropdownMenuItem
                  key={day.getTime()}
                  onClick={() =>
                    createMealPlanMutation.mutate([
                      { recipe_id: recipeId, date: day.toDateString() },
                    ])
                  }
                >
                  {formatRelativeWithoutTime(day)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem onClick={() => mutate()}>
          <Icon name="Trash" size={16} className="mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
