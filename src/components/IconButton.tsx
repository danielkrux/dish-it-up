import { Pressable, PressableProps, StyleSheet } from "react-native";
import Icon, { IconName } from "./Icon";
import theme, { pallettes } from "../theme";

export type IconButtonProps = {
  icon: IconName;
  size?: "small" | "medium" | "large";
  ghost?: boolean;
} & PressableProps;

export default function IconButton({
  icon,
  size = "small",
  style,
  ghost,
  ...props
}: IconButtonProps) {
  const sizeMap = {
    small: theme.spacing.s,
    medium: theme.spacing.m,
    large: theme.spacing.l,
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        {
          opacity: ghost ? 1 : pressed ? 0.7 : 1,
          backgroundColor: ghost
            ? "transparent"
            : styles.container.backgroundColor,
        },
        style as any,
      ]}
      {...props}
    >
      <Icon name={icon} color="black" size={sizeMap[size]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: pallettes.black[100],
  },
});
