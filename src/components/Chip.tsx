import React from "react";

import theme from "../theme";
import Icon, { IconName } from "./Icon";
import Text from "./Text";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

export type ChipData = {
  label?: string | null;
  value: string;
  icon?: IconName;
};

export type ChipProps = ChipData & {
  isSelected?: boolean;
  onPress?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
};

function Chip({ label, value, isSelected, icon, onPress, style }: ChipProps) {
  return (
    <Pressable
      onPress={() => onPress?.(value)}
      style={[styles.container, isSelected && styles.containerSelected, style]}
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
