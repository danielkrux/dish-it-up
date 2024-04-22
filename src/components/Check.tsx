import clsx from "clsx";
import { Pressable, ViewProps } from "react-native";
import Icon from "./Icon";
import { styled } from "nativewind";

function Check({
  selected,
  style,
  onPress,
}: {
  selected: boolean;
  style?: ViewProps["style"];
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={clsx(
        "w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-800 items-center justify-center",
        {
          "bg-primary": selected,
        }
      )}
      style={style}
    >
      {selected && <Icon size={16} name="Check" light />}
    </Pressable>
  );
}

export default styled(Check);
