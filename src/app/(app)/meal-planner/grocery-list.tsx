import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import FloatingButton from "~/components/FloatingButton";

import ListButton from "~/components/ListButton";
import Text from "~/components/Text";
import useCreateGroceryListItem from "~/features/grocery-list/hooks/useCreateGroceryListItem";
import useFetchRecipes from "~/features/recipe/hooks/useFetchRecipes";

function GroceryList() {
	const router = useRouter();
	const { ids } = useLocalSearchParams<{ ids: string }>();
	const idsArray = ids.split(",").map((id) => Number(id));
	const { data } = useFetchRecipes(idsArray);
	const allIngredients = data?.flatMap((recipe) => recipe.ingredients ?? []);

	const [selected, setSelected] = useState<string[]>(allIngredients ?? []);

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
		<>
			<ScrollView className="mx-4 my-6">
				<Text className="mb-2" type="header">
					Grocery List
				</Text>
				{data?.map((recipe) => (
					<View className="mb-4" key={recipe.id}>
						<View className="flex-1 flex-row items-start">
							<Text className="flex-1" type="bodyBold" size="l">
								{recipe.name}
							</Text>
						</View>
						{recipe.ingredients?.map((ingredient, index) => (
							<ListButton
								key={ingredient + index}
								selectable
								selected={selected?.includes(ingredient)}
								onPress={() => handleIngredientPress(ingredient)}
								label={ingredient}
							/>
						))}
					</View>
				))}
			</ScrollView>
			<FloatingButton useSafeArea onPress={() => mutate(selected)}>
				Save
			</FloatingButton>
		</>
	);
}

export default GroceryList;
