import { Button, ContextMenu, Host, Image } from "@expo/ui/swift-ui";
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
      <ContextMenu>
        <ContextMenu.Trigger>
          <Host
            style={{
              width: 10,
              height: 10,
              transform: [{ rotate: "90deg" }],
            }}
          >
            <Image size={16} systemName="plus" color="black" />
          </Host>
        </ContextMenu.Trigger>
        <ContextMenu.Items>
          <Button onPress={onSelectRecipe}>Recipe</Button>
          <Button onPress={onSelectNote}>Note</Button>
        </ContextMenu.Items>
      </ContextMenu>
    </Host>
  );
}

export default MealPlanAddMenu;
