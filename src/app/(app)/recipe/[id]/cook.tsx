import { router, useLocalSearchParams } from "expo-router";
import React, { ReactNode, memo, useCallback, useRef } from "react";
import { ListRenderItemInfo, Platform, View } from "react-native";
import Animated, {
	runOnJS,
	useAnimatedReaction,
	useAnimatedScrollHandler,
	useSharedValue,
} from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import IconButton from "~/components/IconButton";
import Text from "~/components/Text";
import useFetchRecipe from "~/features/recipe/hooks/useFetchRecipe";
import useSafeAreaInsets from "~/hooks/useSafeAreaInsets";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "~/theme";
import Button from "~/components/Button";
import IngredientsSheet from "~/features/cook-mode/components/IngredientsSheet";
import LogRecipe from "~/features/recipe/components/LogRecipe";
import ActionsRow from "~/features/cook-mode/components/ActionsRow";
import { Ingredient, Recipe } from "~/features/recipe/recipe.types";

const ITEM_SIZE = SCREEN_WIDTH * 0.8;
const ITEM_SPACING = (SCREEN_WIDTH - ITEM_SIZE) / 2;

// regex that removes parenthises and it's contents
const parenthesisRegex = new RegExp(/\([^)]*\)/, "g");
const dotsAndCommasRegex = new RegExp(/[.,]/, "g");

function keyExtractor(item: string, index: number) {
	return `${item}-${index}`;
}

function Cook() {
	const params = useLocalSearchParams();
	const id = Number(params.id);
	const { data } = useFetchRecipe(id);
	const instructionsLength = data?.instructions?.length ?? 0;

	const ref = useRef<Animated.FlatList<string>>(null);
	const logRecipeRef = useRef<BottomSheetModal>(null);

	const [currentIndex, setCurrentIndex] = React.useState(0);
	const index = useSharedValue(0);
	const bottomSheetPosition = useSharedValue(0);

	const insets = useSafeAreaInsets();
	const extraPadding = Platform.OS === "ios" ? 0 : 10;

	useAnimatedReaction(
		() => index.value,
		(value) => {
			const clampedIndex = Math.max(
				0,
				Math.min(value, (data?.instructions?.length ?? 0) - 1),
			);
			return runOnJS(setCurrentIndex)(Math.round(clampedIndex));
		},
	);

	const handleScroll = useAnimatedScrollHandler((e) => {
		index.value =
			e.contentOffset.x / (e.layoutMeasurement.width - ITEM_SPACING);
	});

	function handleLogSave() {
		router.back();
		Toast.show({
			type: "success",
			text1: "Recipe logged!",
		});
	}

	const renderInstruction = useCallback(
		({ item, index }: ListRenderItemInfo<string>) => (
			<Instruction data={data} item={item} index={index} />
		),
		[data],
	);

	return (
		<View
			className="flex-1 bg-white dark:bg-gray-950"
			style={{ paddingTop: insets.top + extraPadding }}
		>
			<View className="flex-row mx-4 items-center justify-between">
				<IconButton icon="x" size="medium" onPress={router.back} />
				<Button
					onPress={() => logRecipeRef.current?.present()}
					variant="secondary"
				>
					DONE
				</Button>
			</View>
			<Animated.FlatList
				ref={ref}
				data={data?.instructions}
				horizontal
				onScroll={handleScroll}
				renderItem={renderInstruction}
				showsHorizontalScrollIndicator={false}
				style={{ flexGrow: 0, marginTop: 30 }}
				contentContainerStyle={{
					gap: ITEM_SPACING,
					paddingHorizontal: ITEM_SPACING,
					justifyContent: "center",
					alignItems: "center",
				}}
				keyExtractor={keyExtractor}
				showsVerticalScrollIndicator={false}
				snapToInterval={ITEM_SIZE + ITEM_SPACING}
				decelerationRate="fast"
				scrollEventThrottle={16}
				initialNumToRender={1}
				maxToRenderPerBatch={1}
				// windowSize={3}
			/>
			<ActionsRow
				animatedIndex={index}
				bottomSheetPosition={bottomSheetPosition}
				index={currentIndex}
				instructionsLength={instructionsLength}
				stepsListRef={ref}
			/>
			<IngredientsSheet
				currentInstruction={data?.instructions?.[currentIndex] ?? ""}
				position={bottomSheetPosition}
				ingredients={data?.ingredients}
			/>
			<LogRecipe
				ref={logRecipeRef}
				recipeId={data?.id}
				onSave={handleLogSave}
			/>
		</View>
	);
}

export default Cook;

const Instruction = memo(
	({
		data,
		item,
		index,
	}: { data: Recipe | undefined; item: string; index: number }) => {
		const words: string[] = item.split(" ");
		const instructionWithHighlights: ReactNode[] | string[] = words;

		//check if ingredient name is in instruction and replace with <Text/>
		for (let i = 0; i < words.length; i++) {
			const word = words[i];
			const ingredient = data?.ingredients.find((ingredient) => {
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

				return ingredientName === wordSanitized;
			});

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
	},
);
