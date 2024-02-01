import React, { useMemo, useState } from "react";
import { View } from "react-native";
import Animated, {
	Extrapolate,
	FadeIn,
	FadeOut,
	interpolate,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
} from "react-native-reanimated";

import Text from "~/components/Text";
import { SCREEN_HEIGHT } from "~/theme";
import { Ingredient } from "~/features/recipe/recipe.types";
import BottomSheet from "~/components/BottomSheet";
import Check from "~/components/Check";
import clsx from "clsx";

const parenthesisRegex = new RegExp(/\([^)]*\)/, "g");
const dotsAndCommasRegex = new RegExp(/[.,]/, "g");

export function getMatchedIngredients(
	instruction: string,
	ingredients: Ingredient[] | undefined,
) {
	if (!ingredients) return [];

	const regex = new RegExp(/[\(\)\.\,]/, "g");
	const words = instruction.split(" ");
	const matchedIngredients: Ingredient[] = [];
	for (let i = 0; i < words.length; i++) {
		const word = words[i];
		const ingredient = ingredients.find((ingredient) => {
			const ingredientName = ingredient.name
				.toLowerCase()
				.trim()
				.replace(parenthesisRegex, "")
				.replace(dotsAndCommasRegex, "");
			const wordSanitized = word
				.toLowerCase()
				.trim()
				.replace(parenthesisRegex, "")
				.replace(dotsAndCommasRegex, "");

			return (
				ingredientName === wordSanitized || wordSanitized === ingredientName
			);
		});

		if (ingredient) {
			matchedIngredients.push(ingredient);
		}
	}
	return matchedIngredients;
}

export type IngredientsSheetProps = {
	position: Animated.SharedValue<number>;
	currentInstruction: string;
	ingredients?: Ingredient[];
};

function IngredientsSheet({
	position,
	currentInstruction,
	ingredients,
}: IngredientsSheetProps) {
	const [completeIngredientIds, setCompleteIngredientIds] = useState<number[]>(
		[],
	);
	const sheetIndex = useSharedValue(0);

	const matchedIngredients = getMatchedIngredients(
		currentInstruction,
		ingredients,
	);

	const snapPoints = useMemo(
		() => [SCREEN_HEIGHT * 0.35, SCREEN_HEIGHT * 0.85],
		[],
	);

	const height = useDerivedValue(() => {
		return interpolate(
			sheetIndex.value,
			[0, 1],
			[SCREEN_HEIGHT * 0.35 - 70, SCREEN_HEIGHT * 0.85],
			Extrapolate.CLAMP,
		);
	});

	const flatListStyle = useAnimatedStyle(() => ({
		height: height.value,
	}));

	function toggleIngredient(id: number) {
		setCompleteIngredientIds((prev) => {
			if (prev.includes(id)) {
				return prev.filter((i) => i !== id);
			}
			return [...prev, id];
		});
	}

	const sortedIngredients = useMemo(() => {
		if (!ingredients) return [];
		const copy = [...ingredients];
		return copy.sort(
			(a, b) => matchedIngredients.indexOf(b) - matchedIngredients.indexOf(a),
		);
	}, [ingredients, matchedIngredients]);

	return (
		<BottomSheet
			animateOnMount={false}
			snapPoints={snapPoints}
			handleStyle="bg-gray-100 dark:bg-gray-900"
			handleIndicatorStyle="bg-gray-200 dark:bg-gray-800"
			animatedPosition={position}
			animatedIndex={sheetIndex}
			contentHeight={height}
		>
			<View className=" bg-gray-100 dark:bg-gray-900 flex-1">
				<Text className="font-display text-2xl mx-4 my-2">Ingredients</Text>
				<Animated.FlatList
					style={flatListStyle}
					contentContainerStyle={{ paddingBottom: 30 }}
					keyExtractor={(item, index) => `${item}-${index}`}
					data={sortedIngredients}
					renderItem={({ item }) => {
						const isComplete = completeIngredientIds.includes(item.id);
						const isMatched = matchedIngredients.some((i) => i.id === item.id);

						return (
							<Animated.View
								entering={FadeIn.duration(200)}
								exiting={FadeOut.duration(100)}
								className="flex-row justify-between mx-4 mb-4 g-4"
							>
								<Check
									onPress={() => toggleIngredient(item.id)}
									selected={isComplete}
								/>
								<Text
									className={clsx(
										"font-body text-base flex-1 text-gray-700 dark:text-gray-200",
										{
											"font-body-bold text-gray-950 dark:text-white": isMatched,
										},
									)}
									style={{
										textDecorationLine: isComplete ? "line-through" : undefined,
									}}
								>
									{`${item.amount ?? ""} ${item.unit ?? ""} ${
										item.name
									}`.trim()}
								</Text>
							</Animated.View>
						);
					}}
				/>
			</View>
		</BottomSheet>
	);
}

export default IngredientsSheet;
