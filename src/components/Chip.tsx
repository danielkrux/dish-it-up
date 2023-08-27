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

  return (
    <Pressable
      onPress={() => onPress?.(value)}
      style={[styles.container, isSelected && styles.containerSelected]}
    >
      {icon && <Icon size={16} name={icon} color={theme.colors.text} />}
      {isSelected && <Icon size={16} name="check" color={theme.colors.text} />}
      <Text style={[styles.label, isSelected && styles.labelSelected]}>
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
    alignItems: "center",
    gap: 4,
  },
  containerSelected: {
    backgroundColor: theme.colors.primary,
  },
  label: {
    color: theme.colors.textMuted,
  },
  labelSelected: {
    color: theme.colors.secondary,
    fontFamily: "BodyBold",
  },
});
