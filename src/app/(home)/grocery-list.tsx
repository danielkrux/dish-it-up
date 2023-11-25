import { useRef } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";

import useFetchGroceryList from "../../features/grocery-list/hooks/useFetchGroceryList";
import Text from "../../components/Text";
import theme, { pallettes } from "../../theme";
import ListButton from "../../components/ListButton";
import useUpdateGroceryListItem from "../../features/grocery-list/hooks/useUpdateGroceryListItem";
import { GroceryListItem } from "../../features/grocery-list/groceryList.types";
import Icon from "../../components/Icon";
import useCreateGroceryListItem from "../../features/grocery-list/hooks/useCreateGroceryListItem";

function GroceryList() {
  const addRef = useRef<TextInput>(null);
  const groceries = useFetchGroceryList();
  const completeMutation = useUpdateGroceryListItem();
  const addMutation = useCreateGroceryListItem();

  function handleGroceryItemPress(grocery: GroceryListItem) {
    completeMutation.mutate({
      ...grocery,
      completed: !grocery.completed,
      completed_at: grocery.completed ? null : new Date().toISOString(),
    });
  }

  function handleAddGroceryItem(input: string) {
    addRef.current?.clear();
    addMutation.mutate([input]);
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
              key={grocery.id}
              label={grocery.name ?? ""}
              onPress={() => handleGroceryItemPress(grocery)}
              selected={grocery.completed}
              selectable
            />
          );
        })}
        <View style={styles.addContainer}>
          <Icon size={24} name="plus" color={pallettes.black[500]} />
          <TextInput
            placeholder="Add new item..."
            ref={addRef}
            onSubmitEditing={(event) =>
              handleAddGroceryItem(event.nativeEvent.text)
            }
          />
        </View>
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
  addContainer: {
    paddingVertical: theme.spacing.s,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-start",
    gap: theme.spacing.s,
  },
});
