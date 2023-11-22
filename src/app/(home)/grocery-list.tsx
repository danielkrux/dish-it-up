import { StyleSheet, View } from "react-native";
import useFetchGroceryList from "../../features/grocery-list/hooks/useFetchGroceryList";
import Text from "../../components/Text";
import theme from "../../theme";

function GroceryList() {
  const groceries = useFetchGroceryList();

  return (
    <View style={styles.container}>
      <Text type="header">Groceries</Text>
      {groceries.data?.map((grocery) => (
        <Text key={grocery.id}>{grocery.name}</Text>
      ))}
    </View>
  );
}

export default GroceryList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.m,
    paddingTop: 0,
  },
});
