import { Pressable, StyleSheet } from "react-native";
import Icon, { IconName } from "./Icon";
import Text from "./Text";
import { pallettes } from "../theme";

type ListButtonProps = {
  onPress: () => void;
  label: string;
  icon?: IconName;
};

function ListButton({ label, icon, onPress }: ListButtonProps) {
  return (
    <Pressable onPress={onPress} style={styles.listButton}>
      {icon && <Icon style={styles.listButtonIcon} name={icon} size={24} />}
      <Text>{label}</Text>
    </Pressable>
  );
}

export default ListButton;

const styles = StyleSheet.create({
  listButton: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: pallettes.black[100],
    borderBottomColor: pallettes.black[100],
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  listButtonIcon: {
    marginRight: 16,
  },
});
