import { Tabs } from "expo-router";
import { useRef } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";

import ContextMenu from "~/components/ContextMenu/ContextMenu";
import Icon from "~/components/Icon";
import ListButton from "~/components/ListButton";
import SwipeableRow from "~/components/SwipeableRow";
import { GroceryListItem } from "~/features/grocery-list/groceryList.types";
import useCreateGroceryListItem from "~/features/grocery-list/hooks/useCreateGroceryListItem";
import useDeleteGroceryItems from "~/features/grocery-list/hooks/useDeleteGroceryList";
import useFetchGroceryList from "~/features/grocery-list/hooks/useFetchGroceryList";
import useUpdateGroceryListItem from "~/features/grocery-list/hooks/useUpdateGroceryListItem";
import theme, { pallettes } from "~/theme";

function GroceryList() {
	const addRef = useRef<TextInput>(null);
	const groceries = useFetchGroceryList();
	const completeMutation = useUpdateGroceryListItem();
	const addMutation = useCreateGroceryListItem();
	const deleteMutation = useDeleteGroceryItems();

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
		addRef.current?.focus();
	}

	function handleDelete(onlyCompleted = false) {
		const allIds = groceries.data?.map((g) => g.id);
		const completedIds = groceries.data
			?.filter((g) => g.completed)
			.map((g) => g.id);

		if (!allIds || !completedIds) return;

		deleteMutation.mutate(onlyCompleted ? completedIds : allIds);
	}

	return (
		<View className="flex-1">
			<Tabs.Screen
				options={{
					headerRight: () => (
						<ContextMenu
							actions={[
								{
									label: "Clear completed",
									icon: "check-circle",
									onPress: () => handleDelete(true),
								},
								{
									label: "Delete all",
									destructive: true,
									icon: "trash-2",
									onPress: handleDelete,
								},
							]}
						/>
					),
				}}
			/>
			<ScrollView className="px-4">
				{groceries.data?.map((grocery) => (
					<SwipeableRow
						key={grocery.id}
						rightIcon="trash-2"
						onRightOpen={() => {}}
						rightStyle={styles.rightSwipeAction}
					>
						<ListButton
							label={grocery.name ?? ""}
							onPress={() => handleGroceryItemPress(grocery)}
							selected={grocery.completed}
							selectable
						/>
					</SwipeableRow>
				))}
				<View className="py-3 flex-row items-center flex-1  g-3">
					<Icon size={24} name="plus" color={pallettes.black[500]} />
					<TextInput
						ref={addRef}
						placeholder="Add new item..."
						style={{ fontFamily: "Body", color: theme.colors.secondary }}
						cursorColor={theme.colors.secondary}
						placeholderTextColor={pallettes.black[500]}
						blurOnSubmit={false}
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
	rightSwipeAction: {
		backgroundColor: pallettes.red[100],
	},
});
