import React from "react";
import { View } from "react-native";
import * as Menu from "zeego/dropdown-menu";
import Icon from "~/components/Icon";
import Text from "~/components/Text";
import { RecipeFieldType } from "../types";

export type TypeMenuProps = {
  currentType?: RecipeFieldType;
  disabled?: boolean;
  onTypeChange: (type: RecipeFieldType) => void;
};

function TypeMenu({ currentType, disabled, onTypeChange }: TypeMenuProps) {
  return (
    <Menu.Root>
      <Menu.Trigger>
        <View className="flex-row items-center gap-1">
          <Icon color="#a7aeac" size={20} name="ChevronsUpDown" />
          <Text className="text-gray-300 font-body-bold">
            {currentType?.toUpperCase() ?? "CHOOSE..."}
          </Text>
        </View>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item
          disabled={disabled}
          key="title"
          onSelect={() => onTypeChange("title")}
        >
          <Menu.ItemTitle>Title</Menu.ItemTitle>
        </Menu.Item>
        <Menu.Item
          disabled={disabled}
          key="description"
          onSelect={() => onTypeChange("description")}
        >
          <Menu.ItemTitle>Description</Menu.ItemTitle>
        </Menu.Item>
        <Menu.Item
          disabled={disabled}
          key="ingredients"
          onSelect={() => onTypeChange("ingredient")}
        >
          <Menu.ItemTitle>Ingredient</Menu.ItemTitle>
        </Menu.Item>
        <Menu.Item
          disabled={disabled}
          key="instructions"
          onSelect={() => onTypeChange("instruction")}
        >
          <Menu.ItemTitle>Instruction</Menu.ItemTitle>
        </Menu.Item>
      </Menu.Content>
    </Menu.Root>
  );
}

export default TypeMenu;
