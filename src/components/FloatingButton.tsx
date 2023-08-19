import React, { useState } from "react";
import { LayoutChangeEvent, Pressable, StyleSheet, View } from "react-native";
import Icon, { IconName } from "./Icon";
import Text from "./Text";
import useSafeAreaInsets from "../hooks/useSafeAreaInsets";
import theme, { SCREEN_WIDTH } from "../theme";

type FloatingButtonProps = {
  children: string;
  icon?: IconName;
  onPress?: () => void;
};

export default function FloatingButton({
  children,
  onPress,
  icon,
}: FloatingButtonProps) {
  const [width, setWidth] = useState(0);
  const insets = useSafeAreaInsets();

  const handleLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  return (
    <Pressable
      onPress={onPress}
      style={[
        { bottom: insets.bottom, transform: [{ translateX: -(width / 2) }] },
        styles.button,
      ]}
      onLayout={handleLayout}
    >
      {icon && <Icon name={icon} color={theme.colors.text} size={20} />}
      <Text>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    left: SCREEN_WIDTH / 2,
    flexDirection: "row",
    alignItems: "baseline",
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: 40,
  },
});
