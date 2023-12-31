import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import FloatingButton from "~/components/FloatingButton";
import ListButton from "~/components/ListButton";
import Text from "~/components/Text";
import useCreateGroceryListItem from "~/features/grocery-list/hooks/useCreateGroceryListItem";
import useFetchRecipe from "~/features/recipe/hooks/useFetchRecipe";
import theme from "~/theme";

function SelectGroceries() {
	const router = useRouter();
	const { id } = useLocalSearchParams();
	const { data } = useFetchRecipe(Number(id));
	const ingredients = data?.ingredients;

	const [selected, setSelected] = useState<string[]>(ingredients ?? []);
	const { mutate } = useCreateGroceryListItem({
		onSuccess: () => router.back(),
	});

	function handleIngredientPress(ingredient: string) {
		if (selected.includes(ingredient)) {
			return setSelected((prev) => prev.filter((item) => item !== ingredient));
		}
		return setSelected((prev) => [...prev, ingredient]);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title} type="header">
				Select groceries
			</Text>
			<ScrollView>
				{ingredients?.map((ingredient, index) => (
					<ListButton
						key={ingredient + index}
						selectable
						selected={selected.includes(ingredient)}
						onPress={() => handleIngredientPress(ingredient)}
						label={ingredient}
					/>
				))}
			</ScrollView>
			<FloatingButton useSafeArea onPress={() => mutate(selected)}>
				Save
			</FloatingButton>
		</View>
	);
}

export default SelectGroceries;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: theme.spacing.xl,
		paddingHorizontal: theme.spacing.m,
		paddingTop: theme.spacing.xl,
	},
	title: {
		marginBottom: theme.spacing.xs,
	},
});
