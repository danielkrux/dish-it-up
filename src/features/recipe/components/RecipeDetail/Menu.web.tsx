import { Link } from "expo-router";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ContextMenu/ContextMenu.web";
import Icon from "~/components/Icon";
import IconButton from "~/components/IconButton";
import useFetchRecipe from "../../hooks/useFetchRecipe";
import useDeleteRecipe from "../../hooks/useDeleteRecipe";

type RecipeDetailMenuProps = {
  recipeId: number;
  onDeleteSucces: () => void;
  onShowLogRecipe?: () => void;
};

export default function Menu({
  recipeId,
  onDeleteSucces,
}: RecipeDetailMenuProps) {
  const { data } = useFetchRecipe(recipeId);
  const { mutate } = useDeleteRecipe(recipeId, {
    onSuccess: onDeleteSucces,
  });

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
        <DropdownMenuItem onClick={() => mutate()}>
          <Icon name="Trash" size={16} className="mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
