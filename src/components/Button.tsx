import theme from "../theme";
import Icon, { IconProps } from "./Icon";
import Text from "./Text";
import { Pressable, PressableProps, StyleSheet } from "react-native";

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
      {icon && <Icon name={icon} size={16} />}
      <Text type="header" style={[textStyle, textSizeStyle]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: 4,
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
    borderRadius: 6
  },
  large: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
  },
  smallText: {
    fontSize: theme.fontSize.s,
    lineHeight: 0
  },
  largeText: {
    fontSize: 18,
  },
});
