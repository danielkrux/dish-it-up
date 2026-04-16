import { Button, Menu, Host, Image } from "@expo/ui/swift-ui";
import React from "react";
import useGroceryListMenu from "../hooks/useGroceryListMenu";

function GroceryListMenu() {
  const { handleDelete } = useGroceryListMenu();

  return (
    <Host>
      <Menu
        label={
          <Host
            style={{
              width: 35,
              height: 35,
              transform: [{ rotate: "90deg" }],
            }}
          >
            <Image systemName="ellipsis" color="black" />
          </Host>
        }
      >
        <Button
          systemImage="checkmark.circle"
          onPress={() => handleDelete(true)}
          label="Delete completed"
        />
        <Button systemImage="trash" role="destructive" onPress={handleDelete} label="Delete all" />
      </Menu>
    </Host>
  );
}

export default GroceryListMenu;
