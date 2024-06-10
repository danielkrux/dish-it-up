import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ContextMenu/ContextMenu.web";
import Icon from "~/components/Icon";
import IconButton from "~/components/IconButton";

export type MealPlanAddMenuProps = {
  onSelectRecipe: () => void;
};

function MealPlanAddMenu({ onSelectRecipe }: MealPlanAddMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IconButton icon="Plus" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onSelectRecipe} className="flex gap-2">
          <Icon size={16} name="Utensils" />
          <span>Recipe</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}} className="flex gap-2">
          <Icon size={16} name="StickyNote" />
          <span>Note</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MealPlanAddMenu;
