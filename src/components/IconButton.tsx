import clsx from "clsx";
import { useState } from "react";
import { Pressable, PressableProps } from "react-native";
import theme from "../theme";
import Icon, { IconName } from "./Icon";

export type IconButtonProps = {
  icon: IconName;
  size?: "small" | "medium" | "large";
  ghost?: boolean;
  variant?: "primary" | "secondary";
} & PressableProps;

function IconButton({
  icon,
  size = "small",
  style,
  ghost,
  variant = "primary",
  ...props
}: IconButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const sizeMap = {
    small: theme.spacing.s,
    medium: theme.spacing.m,
    large: theme.spacing.l,
  };

  return (
    <Pressable
      role="button"
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      hitSlop={5}
      className={clsx(
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
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      style={style as any}
      {...props}
    >
      <Icon name={icon} size={sizeMap[size]} />
    </Pressable>
  );
}

export default IconButton;
