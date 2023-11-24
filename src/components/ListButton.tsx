import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import Icon, { IconName } from "./Icon";
import Text from "./Text";
import theme, { pallettes } from "../theme";

type ListButtonProps = {
  onPress: () => void;
  label: string;
  icon?: IconName;
  selectable?: boolean;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
};

function ListButton({
  label,
  icon,
  selectable,
  selected = false,
  style,
  onPress,
}: ListButtonProps) {
  return (
    <Pressable onPress={onPress} style={[styles.listButton, style]}>
      {selectable && (
        <View style={[styles.check, selected && styles.checkSelected]}>
          {selected && (
            <Icon size={16} name="check" color={theme.colors.secondary} />
          )}
        </View>
      )}
      {icon && <Icon name={icon} size={24} />}
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

export default ListButton;

const styles = StyleSheet.create({
  listButton: {
    paddingVertical: theme.spacing.m,
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: pallettes.black[100],
    borderBottomColor: pallettes.black[100],
    borderBottomWidth: 1,
    gap: theme.spacing.m,
  },
  text: {
    flex: 1,
  },
  check: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: pallettes.black[100],
    alignItems: "center",
    justifyContent: "center",
  },
  checkSelected: {
    backgroundColor: theme.colors.primary,
  },
});
