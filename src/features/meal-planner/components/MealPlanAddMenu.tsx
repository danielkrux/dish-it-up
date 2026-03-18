import { Button, Host, Image, Menu } from "@expo/ui/swift-ui";
import React from "react";

export type MealPlanAddMenuProps = {
  onSelectRecipe: () => void;
  onSelectNote: () => void;
};

function MealPlanAddMenu({
  onSelectNote,
  onSelectRecipe,
}: MealPlanAddMenuProps) {
  return (
    <Host style={{ width: 16, height: 16 }}>
      <Menu label={<Image size={16} systemName="plus" color="black" />}>
        <Button label="Recipe" onPress={onSelectRecipe} />
        <Button label="Note" onPress={onSelectNote} />
      </Menu>
    </Host>
  );
}

export default MealPlanAddMenu;
