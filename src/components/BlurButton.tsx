import clsx from "clsx";
import { BlurView } from "expo-blur";
import { useColorScheme } from "nativewind";
import { Pressable, PressableProps } from "react-native";
import Icon, { IconName } from "./Icon";
import Text from "./Text";

function BlurButton({
  label,
  icon,
  onPress,
  ...props
}: {
  label?: string;
  icon?: IconName;
  onPress?: () => void;
} & PressableProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const iconOnly = icon && !label;

  return (
    <Pressable
      {...props}
      onPress={onPress}
      className="overflow-hidden rounded-full self-start"
    >
      <BlurView
        intensity={100}
        tint={isDark ? "dark" : "light"}
        className={clsx("px-3 py-1 flex-row items-center gap-2", {
          "p-1": iconOnly,
        })}
      >
        {icon && <Icon name={icon} size={18} />}
        {label && <Text size="m">{label}</Text>}
      </BlurView>
    </Pressable>
  );
}

export default BlurButton;
