import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "~/components/ContextMenu/ContextMenu.web";
import Icon from "~/components/Icon";
import Text from "~/components/Text";
import useSortRecipes from "../hooks/useSortRecipes";

function SortRecipes() {
  const { sortOptions, handleSort, s, DEFAULT_SORT } = useSortRecipes({
    onSortComplete: () => {},
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mt-2">
        <Text className="font-body-bold text-gray-600 dark:text-gray-300">
          SORT
        </Text>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={s ?? DEFAULT_SORT}>
          {sortOptions.map((sortItem) => (
            <DropdownMenuRadioItem
              key={sortItem.value}
              value={sortItem.value}
              onClick={() => handleSort(sortItem.value)}
            >
              <Icon name={sortItem.icon} size={16} className="mr-2" />
              {sortItem.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SortRecipes;
