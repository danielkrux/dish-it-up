import React from "react";

import theme from "../theme";
import Icon, { IconName } from "./Icon";
import Text from "./Text";
import { Pressable, StyleSheet } from "react-native";

export type ChipProps = {
  label: string;
  value: string;
  icon?: IconName;
  isSelected?: boolean;
  onPress?: (value: string) => void;
};

function Chip({ label, value, isSelected, icon, onPress }: ChipProps) {
  // const iconColor = isSelected
  //   ? theme.colors.primary.white
  //   : theme.colors.primary.anthracite;

  return (
    <Pressable
      onPress={() => onPress?.(value)}
      style={[styles.container, isSelected && styles.containerSelected]}
    >
      {icon && <Icon size={16} name={icon} color={theme.colors.text} />}
      <Text type="header" size="l" style={[styles.label, isSelected && styles.labelSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

export default Chip;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.s,
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
    borderRadius: 10,
  },
  containerSelected: {},
  label: {
  },
  labelSelected: {},
});
