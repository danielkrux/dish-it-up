import { ScrollView, StyleSheet, View } from "react-native";
import useFetchGroceryList from "../../features/grocery-list/hooks/useFetchGroceryList";
import Text from "../../components/Text";
import theme from "../../theme";
import ListButton from "../../components/ListButton";
import useUpdateGroceryListItem from "../../features/grocery-list/hooks/useUpdateGroceryListItem";
import { GroceryListItem } from "../../features/grocery-list/groceryList.types";

function GroceryList() {
  const groceries = useFetchGroceryList();
  const completeMutation = useUpdateGroceryListItem();

  function handleGroceryItemPress(grocery: GroceryListItem) {
    () =>
      completeMutation.mutate({
        ...grocery,
        completed: !grocery.completed,
        completed_at: grocery.completed ? null : new Date().toISOString(),
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title} type="header">
        Groceries
      </Text>
      <ScrollView style={styles.list}>
        {groceries.data?.map((grocery) => {
          return (
            <ListButton
              label={grocery.name ?? ""}
              onPress={() => handleGroceryItemPress(grocery)}
              selected={grocery.completed}
              key={grocery.id}
              selectable
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default GroceryList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  title: {
    marginHorizontal: theme.spacing.m,
  },
  list: {
    paddingHorizontal: theme.spacing.m,
  },
});
