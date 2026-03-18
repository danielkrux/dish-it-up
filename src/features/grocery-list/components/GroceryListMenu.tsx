import { Button, Host, Image, Menu } from "@expo/ui/swift-ui";
import React from "react";
import useGroceryListMenu from "../hooks/useGroceryListMenu";

function GroceryListMenu() {
  const { handleDelete } = useGroceryListMenu();

  return (
    <Host style={{ width: 35, height: 35 }}>
      <Menu label={<Image systemName="ellipsis" color="black" />}>
        <Button
          label="Delete completed"
          systemImage="checkmark.circle"
          onPress={() => handleDelete(true)}
        />
        <Button
          label="Delete all"
          systemImage="trash"
          role="destructive"
          onPress={handleDelete}
        />
      </Menu>
    </Host>
  );
}

export default GroceryListMenu;
