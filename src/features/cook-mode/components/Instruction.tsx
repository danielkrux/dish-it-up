import { ReactNode, memo } from "react";
import { Recipe } from "~/features/recipe/recipe.types";
import { findMatchingIngredient } from "../utils";
import Text from "~/components/Text";
import { View } from "react-native";
import ScrollView from "~/components/ScrollView";
import { SCREEN_HEIGHT } from "~/theme";
import { ITEM_SIZE } from "../constants";

function Instruction({
	data,
	item,
	index,
}: { data: Recipe | undefined; item: string; index: number }) {
	const words: string[] = item.split(" ");
	const instructionWithHighlights: ReactNode[] | string[] = words;

	//check if ingredient name is in instruction and replace with <Text/>
	for (let i = 0; i < words.length; i++) {
		const word = words[i];
		const ingredient = findMatchingIngredient(word, data?.ingredients);

		if (ingredient) {
			words.filter((w) => w !== word);
			instructionWithHighlights[i] = (
				<Text className="font-body-bold text-xl text-acapulco-400 dark:text-acapulco-500">
					{word}{" "}
				</Text>
			);
		}
	}

	const instruction = instructionWithHighlights.map((word) => {
		if (typeof word !== "string") return word;
		return `${word} `;
	});

	return (
		<View style={{ width: ITEM_SIZE }}>
			<Text className="font-display text-5xl mb-2 text-gray-400 self-start">
				Step {index + 1}
			</Text>
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={{ maxHeight: SCREEN_HEIGHT * 0.3 }}
			>
				<Text adjustsFontSizeToFit className="font-body text-xl">
					{instruction}
				</Text>
			</ScrollView>
		</View>
	);
}

export default memo(Instruction);
