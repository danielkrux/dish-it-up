import { Button, ContextMenu, Host, Image } from "@expo/ui/swift-ui";
import React from "react";
import useGroceryListMenu from "../hooks/useGroceryListMenu";

function GroceryListMenu() {
  const { handleDelete } = useGroceryListMenu();

  return (
    <Host>
      <ContextMenu>
        <ContextMenu.Trigger>
          <Host
            style={{
              width: 35,
              height: 35,
              transform: [{ rotate: "90deg" }],
            }}
          >
            <Image systemName="ellipsis" color="black" />
          </Host>
        </ContextMenu.Trigger>
        <ContextMenu.Items>
          <Button
            systemImage="checkmark.circle"
            onPress={() => handleDelete(true)}
          >
            Delete completed
          </Button>
          <Button systemImage="trash" role="destructive" onPress={handleDelete}>
            Delete all
          </Button>
        </ContextMenu.Items>
      </ContextMenu>
    </Host>
  );
}

export default GroceryListMenu;
