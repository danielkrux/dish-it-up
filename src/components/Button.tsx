import { Pressable, PressableProps, StyleSheet } from "react-native";
import theme from "../theme";
import Icon, { IconProps } from "./Icon";
import Text from "./Text";

export type ButtonProps = {
  size?: "small" | "large";
  variant?: "primary" | "secondary" | "ghost";
  children: string;
  icon?: IconProps["name"];
} & PressableProps;

export default function Button({
  variant = "primary",
  size = "small",
  disabled,
  children,
  style,
  icon,
  ...props
}: ButtonProps) {
  const sizeStyle = styles[size];
  const variantStyle = styles[variant];
  // const pressedStyle = styles[`${variant}Pressed`];
  const textStyle = styles[`${variant}Text`];
  const textSizeStyle = styles[`${size}Text`];
  // const iconSizeStyle = styles[`${size}Icon`];

  // const Icon = icon && iconLookup[icon];

  return (
    <Pressable
      style={[
        icon && styles.iconContainer,
        // @ts-ignore
        style,
        styles.container,
        sizeStyle,
        variantStyle,
        // pressed && pressedStyle,
        // disabled && variant !== "ghost" && styles.disabled,
      ]}
      disabled={disabled}
      {...props}
    >
      {icon && <Icon name={icon} size={16} color={theme.colors.white} />}
      <Text style={[textStyle, textSizeStyle]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
  primary: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },
  primaryText: {
    color: theme.colors.text,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  secondaryText: {
    color: theme.colors.textLight,
  },
  ghost: {
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
  ghostText: {
    color: theme.colors.black,
  },
  small: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.s,
    alignSelf: "flex-start",
  },
  large: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
  },
  smallText: {
    fontSize: theme.fontSize.s,
  },
  largeText: {
    fontSize: theme.fontSize.m,
  },
});
