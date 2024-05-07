import React from "react";
import * as Menu from "zeego/dropdown-menu";
import IconButton from "~/components/IconButton";
import useGroceryListMenu from "../hooks/useGroceryListMenu";

function GroceryListMenu() {
  const { handleDelete } = useGroceryListMenu();

  return (
    <Menu.Root>
      <Menu.Trigger>
        <IconButton size="medium" icon="EllipsisVertical" />
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item key="clear-completed" onSelect={() => handleDelete(true)}>
          <Menu.ItemIcon ios={{ name: "checkmark.circle" }} />
          <Menu.ItemTitle>Clear completed</Menu.ItemTitle>
        </Menu.Item>
        <Menu.Item key="delete" destructive onSelect={handleDelete}>
          <Menu.ItemIcon ios={{ name: "trash" }} />
          <Menu.ItemTitle>Delete</Menu.ItemTitle>
        </Menu.Item>
      </Menu.Content>
    </Menu.Root>
  );
}

export default GroceryListMenu;
