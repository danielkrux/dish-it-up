import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";

import FloatingButton from "~/components/FloatingButton";
import IconButton from "~/components/IconButton";
import ListButton from "~/components/ListButton";
import Text from "~/components/Text";
import useCreateGroceryListItem from "~/features/grocery-list/hooks/useCreateGroceryListItem";
import useFetchRecipe from "~/features/recipe/hooks/useFetchRecipe";
import { findRecipeYieldAmount } from "~/features/recipe/recipe.utils";

function SelectGroceries() {
	const router = useRouter();
	const { id } = useLocalSearchParams();
	const { data } = useFetchRecipe(Number(id));
	const [yieldMultiplier, setYieldsMultiplier] = useState(1);
	const initialIngredients = data?.ingredients.map((i) => i.name ?? "");
	const recipeYieldAmount = findRecipeYieldAmount(data?.recipe_yield ?? "");

	const [selected, setSelected] = useState<string[]>(initialIngredients ?? []);
	const { mutate, isLoading } = useCreateGroceryListItem({
		onSuccess: router.back,
	});

	function handleIngredientPress(ingredient: string) {
		if (selected.includes(ingredient)) {
			return setSelected((prev) => prev.filter((item) => item !== ingredient));
		}
		return setSelected((prev) => [...prev, ingredient]);
	}

	return (
		<View className="flex-1 py-6 px-4">
			<Text type="header">Select groceries</Text>
			<Text className="mb-4 text-bold text-gray-300">{data?.name}</Text>
			{recipeYieldAmount && (
				<View className="flex-row items-center g-3 mb-4">
					<IconButton
						size="small"
						icon="minus"
						onPress={() =>
							setYieldsMultiplier(yieldMultiplier - 1 / recipeYieldAmount)
						}
					/>
					<Text>{recipeYieldAmount * yieldMultiplier} persons</Text>
					<IconButton
						size="small"
						icon="plus"
						onPress={() =>
							setYieldsMultiplier(yieldMultiplier + 1 / recipeYieldAmount)
						}
					/>
				</View>
			)}
			<ScrollView>
				{data?.ingredients?.map((ingredient, index) => {
					const name = ingredient.name ?? "";
					const amount = Number(ingredient.amount) ?? "";
					const unit = ingredient.unit ?? "";

					const label = `${amount * yieldMultiplier} ${unit} ${name}`;

					return (
						<ListButton
							key={name + index}
							selectable
							selected={selected.includes(name)}
							onPress={() => handleIngredientPress(name)}
							label={label}
							className="dark:bg-gray-950"
						/>
					);
				})}
			</ScrollView>
			<FloatingButton
				loading={isLoading}
				useSafeArea
				onPress={() => mutate(selected)}
			>
				Save
			</FloatingButton>
		</View>
	);
}

export default SelectGroceries;
