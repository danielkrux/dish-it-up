import { StyleSheet, View } from "react-native";
import TextInput from "../../../components/Input";
import theme from "../../../theme";
import Button from "../../../components/Button";

export default function EnterUrl({
  value,
  onChangeText,
  onSubmit,
}: {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}) {
  return (
    <View style={styles.container}>
      <TextInput
        bottomSheet
        style={styles.input}
        placeholder="Recipe URL"
        onChangeText={onChangeText}
        value={value}
      />
      <Button size="large" onPress={onSubmit}>
        Import Recipe
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.s,
  },
  input: {
    marginBottom: theme.spacing.s,
  },
});
