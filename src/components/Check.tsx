import { StyleSheet, View } from "react-native";
import theme, { pallettes } from "../theme";
import Icon from "./Icon";

function Check({ selected }: { selected: boolean }) {
  return (
    <View style={[styles.check, selected && styles.checkSelected]}>
      {selected && (
        <Icon size={16} name="check" color={theme.colors.secondary} />
      )}
    </View>
  );
}

export default Check;

const styles = StyleSheet.create({
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
