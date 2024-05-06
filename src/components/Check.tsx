import clsx from "clsx";
import { Pressable } from "react-native";
import Icon from "./Icon";

function Check({
  selected,
  className,
  onPress,
}: {
  selected: boolean;
  className?: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={clsx(
        "w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-800 items-center justify-center",
        {
          "bg-primary": selected,
        },
        className
      )}
    >
      {selected && <Icon size={16} name="Check" light />}
    </Pressable>
  );
}

export default Check;
