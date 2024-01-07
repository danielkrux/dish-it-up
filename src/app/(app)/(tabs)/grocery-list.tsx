import { Tabs } from "expo-router";
import { useRef } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import * as Menu from "zeego/dropdown-menu";

import Icon from "~/components/Icon";
import IconButton from "~/components/IconButton";
import ListButton from "~/components/ListButton";
import SwipeableRow from "~/components/SwipeableRow";
import { GroceryListItem } from "~/features/grocery-list/groceryList.types";
import useCreateGroceryListItem from "~/features/grocery-list/hooks/useCreateGroceryListItem";
import useDeleteGroceryItems from "~/features/grocery-list/hooks/useDeleteGroceryList";
import useFetchGroceryList from "~/features/grocery-list/hooks/useFetchGroceryList";
import useUpdateGroceryListItem from "~/features/grocery-list/hooks/useUpdateGroceryListItem";
import { colors } from "~/theme";

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
		addMutation.mutate([{ name: input, amount: null, unit: null }]);
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
						<Menu.Root>
							<Menu.Trigger>
								<IconButton size="medium" icon="more-vertical" />
							</Menu.Trigger>
							<Menu.Content>
								<Menu.Item
									key="clear-completed"
									onSelect={() => handleDelete(true)}
								>
									<Menu.ItemIcon ios={{ name: "checkmark.circle" }} />
									<Menu.ItemTitle>Clear completed</Menu.ItemTitle>
								</Menu.Item>
								<Menu.Item key="delete" destructive onSelect={handleDelete}>
									<Menu.ItemIcon ios={{ name: "trash" }} />
									<Menu.ItemTitle>Delete</Menu.ItemTitle>
								</Menu.Item>
							</Menu.Content>
						</Menu.Root>
					),
				}}
			/>
			<KeyboardAwareScrollView bottomOffset={20} className="px-4">
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
							className="bg-white dark:bg-gray-950"
						/>
					</SwipeableRow>
				))}
				<View className="py-3 flex-row items-center flex-1  g-3">
					<Icon size={24} name="plus" className="text-gray-500" />
					<TextInput
						ref={addRef}
						placeholder="Add new item..."
						className="font-body text-sm flex-1 text-gray-900 dark:text-white"
						cursorColor={colors.primary[500]}
						placeholderTextColor={colors.gray[500]}
						blurOnSubmit={false}
						onSubmitEditing={(event) =>
							handleAddGroceryItem(event.nativeEvent.text)
						}
					/>
				</View>
			</KeyboardAwareScrollView>
		</View>
	);
}

export default GroceryList;

const styles = StyleSheet.create({
	rightSwipeAction: {
		backgroundColor: colors.red[100],
	},
});
