import { Pressable, StyleProp, ViewStyle } from "react-native";
import Check from "./Check";
import Icon, { IconName } from "./Icon";
import Text from "./Text";
import clsx from "clsx";

type ListButtonProps = {
  onPress: () => void;
  label: string;
  icon?: IconName;
  selectable?: boolean;
  selected?: boolean;
  className?: string;
};

function ListButton({
  label,
  icon,
  selectable,
  selected = false,
  className,
  onPress,
}: ListButtonProps) {
  return (
    <Pressable
      className={clsx(
        "py-3 flex-row items-center border-b border-b-gray-100 bg-white gap-4 dark:bg-gray-950 dark:border-b-gray-900",
        className
      )}
      onPress={onPress}
    >
      {selectable && <Check onPress={onPress} selected={selected} />}
      {icon && <Icon name={icon} size={24} />}
      <Text className="flex-1">{label}</Text>
    </Pressable>
  );
}

export default ListButton;
