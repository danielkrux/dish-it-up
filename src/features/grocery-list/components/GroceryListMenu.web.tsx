import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ContextMenu/ContextMenu.web";
import Icon from "~/components/Icon";
import IconButton from "~/components/IconButton";

import useGroceryListMenu from "../hooks/useGroceryListMenu";

export default function GroceryListMenu() {
  const { handleDelete } = useGroceryListMenu();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IconButton size="medium" icon="EllipsisVertical" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleDelete(true)}>
          <Icon name="CircleCheck" size={16} className="mr-2" />
          Clear completed
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDelete()}>
          <Icon name="Trash" size={16} className="mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
