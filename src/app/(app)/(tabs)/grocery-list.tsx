import { useRef } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";

import { Tabs } from "expo-router";
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
		<View style={styles.container}>
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
			<ScrollView
				// contentInsetAdjustmentBehavior="automatic"
				style={styles.list}
			>
				{groceries.data?.map((grocery) => (
					<SwipeableRow
						key={grocery.id}
						rightIcon="trash-2"
						onRightOpen={() => {}}
						rightStyle={styles.rightSwipeAction}
					>
						<ListButton
							key={grocery.id}
							label={grocery.name ?? ""}
							onPress={() => handleGroceryItemPress(grocery)}
							selected={grocery.completed}
							selectable
						/>
					</SwipeableRow>
				))}
				<View style={styles.addContainer}>
					<Icon size={24} name="plus" color={pallettes.black[500]} />
					<TextInput
						ref={addRef}
						placeholder="Add new item..."
						style={{ fontFamily: "Body", color: theme.colors.secondary }}
						cursorColor={theme.colors.secondary}
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
	rightSwipeAction: {
		backgroundColor: pallettes.red[100],
	},
});