import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "~/components/ContextMenu/ContextMenu.web";
import useSortRecipes from "../hooks/useSortRecipes";
import Text from "~/components/Text";
import Icon from "~/components/Icon";

function SortRecipes() {
  const { sortOptions, handleSort, s } = useSortRecipes({
    onSortComplete: () => {},
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Text className="font-body-bold text-gray-600 dark:text-gray-300 mt-1">
          SORT
        </Text>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={s}>
          {sortOptions.map((sortItem) => {
            return (
              <DropdownMenuRadioItem
                key={sortItem.value}
                value={sortItem.value}
                onClick={() => handleSort(sortItem.value)}
              >
                <Icon name={sortItem.icon} size={16} className="mr-2" />
                {sortItem.label}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SortRecipes;
