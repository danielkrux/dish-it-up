import clsx from "clsx";
import React from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";

import Icon, { IconName } from "./Icon";
import Text from "./Text";

export type ChipData = {
  label: string | undefined;
  value: string;
  icon?: IconName;
};

export type ChipProps = ChipData & {
  isSelected?: boolean;
  onPress?: (value: string) => void;
  onLongPress?: (value: string) => void;
  className?: string;
};

function Chip({
  label,
  value,
  isSelected,
  icon,
  onPress,
  onLongPress,
  className,
}: ChipProps) {
  return (
    <Pressable
      onPress={() => onPress?.(value)}
      onLongPress={() => onLongPress?.(value)}
      className={clsx(
        "flex-row justify-evenly items-center bg-gray-100 dark:bg-gray-900 rounded-lg gap-1 px-2 py-1.5 min-w-[75] min-h-[30]",
        { "bg-primary": isSelected },
        className
      )}
    >
      {icon && <Icon size={16} name={icon} className="text-white" />}
      {isSelected && (
        <Icon size={16} name="Check" className="text-white" light />
      )}
      <Text
        className={clsx("text-gray-900 dark:text-white font-body-bold", {
          "text-white": isSelected,
        })}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default Chip;
