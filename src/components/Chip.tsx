import React from "react";

import { Pressable, StyleSheet } from "react-native";
import Icon, { IconName } from "./Icon";
import theme from "../theme";
import Text from "./Text";

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

      <Text style={[styles.label, isSelected && styles.labelSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

export default Chip;

const styles = StyleSheet.create({
  container: {},
  containerSelected: {},
  label: {},
  labelSelected: {},
});
