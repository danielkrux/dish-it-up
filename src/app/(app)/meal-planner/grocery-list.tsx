import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import FloatingButton from "~/components/FloatingButton";

import ListButton from "~/components/ListButton";
import Text from "~/components/Text";
import useCreateGroceryListItem from "~/features/grocery-list/hooks/useCreateGroceryListItem";
import useFetchRecipes from "~/features/recipe/hooks/useFetchRecipes";
import { Ingredient } from "~/features/recipe/recipe.types";
import { parseIngredientAmount } from "~/features/recipe/recipe.utils";

function GroceryList() {
	const router = useRouter();
	const { ids } = useLocalSearchParams<{ ids: string }>();
	const idsArray = ids.split(",").map((id) => Number(id));
	const { data } = useFetchRecipes(idsArray);
	const allIngredients = data?.flatMap((recipe) => recipe.ingredients ?? []);

	const [selected, setSelected] = useState<Ingredient[]>(allIngredients ?? []);

	const { mutate } = useCreateGroceryListItem({
		onSuccess: () => router.back(),
	});

	function handleIngredientPress(ingredient: Ingredient) {
		if (selected.find((item) => item.id === ingredient.id)) {
			return setSelected((prev) =>
				prev.filter((item) => item.id !== ingredient.id),
			);
		}
		return setSelected((prev) => [...prev, ingredient]);
	}

	return (
		<View className="flex-1 py-6">
			<ScrollView
				className="px-4"
				contentContainerStyle={{ paddingBottom: 75 }}
			>
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
						{recipe.ingredients?.map((ingredient) => {
							const name = ingredient.name ?? "";
							const parsedAmount = ingredient.amount;
							const amount = parsedAmount ? parsedAmount : "";
							const unit = ingredient.unit ?? "";

							const label = `${amount} ${unit} ${name}`.trim();

							return (
								<ListButton
									key={ingredient.id}
									selectable
									selected={selected?.includes(ingredient)}
									onPress={() => handleIngredientPress(ingredient)}
									label={label}
									className="dark:bg-gray-950"
								/>
							);
						})}
					</View>
				))}
			</ScrollView>
			<FloatingButton useSafeArea onPress={() => mutate(selected)}>
				Save
			</FloatingButton>
		</View>
	);
}

export default GroceryList;
