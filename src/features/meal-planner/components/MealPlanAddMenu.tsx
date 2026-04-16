import { Button, Menu, Host, Image } from "@expo/ui/swift-ui";
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
    <Host>
      <Menu
        label={
          <Host
            style={{
              width: 10,
              height: 10,
              transform: [{ rotate: "90deg" }],
            }}
          >
            <Image size={16} systemName="plus" color="black" />
          </Host>
        }
      >
        <Button onPress={onSelectRecipe} label="Recipe" />
        <Button onPress={onSelectNote} label="Note" />
      </Menu>
    </Host>
  );
}

export default MealPlanAddMenu;
