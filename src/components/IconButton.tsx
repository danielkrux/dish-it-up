import { useState } from "react";
import { Pressable, PressableProps } from "react-native";
import Icon, { IconName } from "./Icon";
import { cn } from "~/utils/tailwind";

export type IconButtonProps = {
  icon: IconName;
  size?: "small" | "medium" | "large";
  ghost?: boolean;
  variant?: "primary" | "secondary";
  iconClassName?: string;
} & PressableProps;

function IconButton({
  icon,
  size = "small",
  style,
  ghost,
  variant = "primary",
  iconClassName,
  ...props
}: IconButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const sizeMap = {
    small: 12,
    medium: 16,
    large: 20,
  };

  return (
    <Pressable
      role="button"
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      hitSlop={5}
      {...props}
      className={cn(
        "p-3 rounded-full items-center justify-center bg-gray-100 dark:bg-gray-900",
        {
          "bg-transparent": ghost,
          "bg-acapulco-300/30": variant === "secondary",
          "opacity-80": isPressed,
          "p-1.5": size === "small",
          "p-2": size === "medium",
        },
        props.className
      )}
    >
      <Icon className={iconClassName} name={icon} size={sizeMap[size]} />
    </Pressable>
  );
}

export default IconButton;
