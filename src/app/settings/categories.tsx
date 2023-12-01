import { Alert, ScrollView, StyleSheet, View } from "react-native";
import useFetchCategories from "../../features/recipe/hooks/useFetchCategories";
import Text from "../../components/Text";
import theme, { pallettes } from "../../theme";
import IconButton from "../../components/IconButton";
import useDeleteCategory from "../../features/recipe/hooks/useDeleteCategory";
import useUpdateCategory from "../../features/recipe/hooks/useUpdateCategory";
import FloatingButton from "../../components/FloatingButton";
import useCreateCategory from "../../features/recipe/hooks/useCreateCategory";

export default function Settings() {
	const { data } = useFetchCategories();
	const deleteCategoryMutation = useDeleteCategory();
	const editCategoryMutation = useUpdateCategory();
	const createCategoryMutation = useCreateCategory();

	function addCategory() {
		Alert.prompt(
			"Add Category",
			"Enter a name for this category",
			[
				{ text: "Cancel" },
				{
					text: "Confirm",
					onPress: (value) => createCategoryMutation.mutate(value),
				},
			],
			"plain-text",
		);
	}

	function updateCategory(id: number, name?: string | null) {
		Alert.prompt(
			"Update Category",
			"Enter a new name for this category",
			[
				{ text: "Cancel" },
				{
					text: "Confirm",
					onPress: (value) => editCategoryMutation.mutate({ id, name: value }),
				},
			],
			"plain-text",
			name ?? "",
		);
	}

	function deleteCategory(id: number) {
		Alert.alert(
			"Delete Category",
			"Are you sure you want to delete this category?",
			[
				{ text: "No", isPreferred: true },
				{ text: "Yes", onPress: () => deleteCategoryMutation.mutate(id) },
			],
		);
	}

	return (
		<>
			<ScrollView>
				{data?.map((category) => (
					<View key={category.id} style={styles.category}>
						<Text>{category.name}</Text>
						<View style={styles.actions}>
							<IconButton
								onPress={() => updateCategory(category.id, category.name)}
								icon="edit-2"
								size="medium"
							/>
							<IconButton
								onPress={() => deleteCategory(category.id)}
								icon="trash-2"
								size="medium"
							/>
						</View>
					</View>
				))}
			</ScrollView>
			<FloatingButton useSafeArea onPress={addCategory}>
				Add Category
			</FloatingButton>
		</>
	);
}

const styles = StyleSheet.create({
	category: {
		paddingVertical: theme.spacing.s,
		paddingHorizontal: theme.spacing.m,
		flexDirection: "row",
		alignItems: "center",
		borderTopColor: pallettes.black[100],
		borderBottomColor: pallettes.black[100],
		borderTopWidth: 1,
		borderBottomWidth: 1,
		justifyContent: "space-between",
	},
	actions: {
		gap: theme.spacing.s,
		flexDirection: "row",
	},
});
