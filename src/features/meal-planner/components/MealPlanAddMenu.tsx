import React from "react";
import * as Menu from "zeego/dropdown-menu";
import IconButton from "~/components/IconButton";

export type MealPlanAddMenuProps = {
  onSelectRecipe: () => void;
  onSelectNote: () => void;
};

function MealPlanAddMenu({
  onSelectNote,
  onSelectRecipe,
}: MealPlanAddMenuProps) {
  return (
    <>
      <Menu.Root>
        <Menu.Trigger>
          <IconButton icon="Plus" />
        </Menu.Trigger>
        <Menu.Content align="end">
          <Menu.Item key="recipe" onSelect={onSelectRecipe}>
            <Menu.ItemIcon ios={{}} />
            <Menu.ItemTitle>Recipe</Menu.ItemTitle>
          </Menu.Item>
          <Menu.Item key="note" onSelect={onSelectNote}>
            <Menu.ItemIcon ios={{}} />
            <Menu.ItemTitle>Note</Menu.ItemTitle>
          </Menu.Item>
        </Menu.Content>
      </Menu.Root>
    </>
  );
}

export default MealPlanAddMenu;
