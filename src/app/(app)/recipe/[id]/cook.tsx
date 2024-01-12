import { router, useLocalSearchParams } from "expo-router";
import React, { ReactNode, useRef } from "react";
import { ListRenderItemInfo, Platform, View } from "react-native";
import Animated, {
	Extrapolate,
	interpolate,
	runOnJS,
	useAnimatedReaction,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { FlatList } from "react-native-gesture-handler";

import IconButton from "~/components/IconButton";
import Text from "~/components/Text";
import useFetchRecipe from "~/features/recipe/hooks/useFetchRecipe";
import useSafeAreaInsets from "~/hooks/useSafeAreaInsets";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "~/theme";
import Button from "~/components/Button";
import IngredientsSheet from "~/features/cook-mode/components/IngredientsSheet";

const ITEM_SIZE = SCREEN_WIDTH * 0.8;
const ITEM_SPACING = (SCREEN_WIDTH - ITEM_SIZE) / 2;

function Cook() {
	const params = useLocalSearchParams();
	const id = Number(params.id);
	const { data } = useFetchRecipe(id);
	const instructionsLength = data?.instructions?.length ?? 0;

	const insets = useSafeAreaInsets();
	const extraPadding = Platform.OS === "ios" ? 0 : 10;

	const ref = useRef<FlatList<string>>(null);
	const [currentIndex, setCurrentIndex] = React.useState(0);
	const index = useSharedValue(0);
	const bottomSheetPosition = useSharedValue(0);
	const [actionsY, setActionsY] = React.useState(0);

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

	const actionsStyle = useAnimatedStyle(() => ({
		opacity: withTiming(bottomSheetPosition.value > actionsY + 50 ? 1 : 0),
		transform: [{ translateY: bottomSheetPosition.value - actionsY - 70 }],
	}));

	const progressBarTranslate = useDerivedValue(() => {
		// SCREEN_WIDTH - OUTER_PADDING - LEFT_ARROW - RIGHT_ARROW - INNER_PADDING
		const progressBarWidth = SCREEN_WIDTH - (16 * 2 + 44 * 2 + 12 * 2);
		return interpolate(
			index.value,
			[0, instructionsLength - 1],
			[-progressBarWidth, 0],
			Extrapolate.CLAMP,
		);
	});

	const progressBarStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: progressBarTranslate.value }],
	}));

	function renderInstruction({ item, index }: ListRenderItemInfo<string>) {
		const words: string[] = item.split(" ");
		const instrucitonWithHightlights: ReactNode[] | string[] = words;

		// rege that ignores parenthesis and points
		const regex = new RegExp(/[\(\)\.]/, "g");

		//check if ingredient name is in instruction and replace with <Text/>
		for (let i = 0; i < words.length; i++) {
			const word = words[i];
			const ingredient = data?.ingredients.find((ingredient) => {
				const ingredientName = ingredient.name.toLowerCase().replace(regex, "");
				const wordSanitized = word.toLowerCase().replace(regex, "");

				return (
					ingredientName.startsWith(wordSanitized.toLowerCase()) ||
					wordSanitized.toLowerCase().startsWith(ingredientName)
				);
			});

			if (ingredient) {
				words.filter((w) => w !== word);
				instrucitonWithHightlights[i] = (
					<Text className="font-body text-xl text-acapulco-500">{word} </Text>
				);
			}
		}

		const instruction = instrucitonWithHightlights.map((word) => {
			if (typeof word !== "string") return word;
			return `${word} `;
		});

		return (
			<View style={{ width: ITEM_SIZE }}>
				<Text className="font-display text-5xl mb-2 text-gray-400 self-start">
					Step {index + 1}
				</Text>
				<Text className="font-body text-xl">{instruction}</Text>
			</View>
		);
	}

	return (
		<View
			className="flex-1 bg-white dark:bg-gray-950"
			style={{ paddingTop: insets.top + extraPadding }}
		>
			<View className="flex-row mx-4 justify-between">
				<IconButton icon="x" size="medium" onPress={router.back} />
				<Button variant="secondary">DONE</Button>
			</View>
			<Animated.FlatList
				ref={ref}
				data={data?.instructions}
				horizontal
				onScroll={handleScroll}
				renderItem={renderInstruction}
				showsHorizontalScrollIndicator={false}
				style={{ flexGrow: 0, marginTop: SCREEN_HEIGHT / 8 }}
				contentContainerStyle={{
					gap: ITEM_SPACING,
					paddingHorizontal: ITEM_SPACING,
					justifyContent: "center",
					alignItems: "center",
				}}
				keyExtractor={(item, index) => `${item}-${index}`}
				showsVerticalScrollIndicator={false}
				snapToInterval={ITEM_SIZE + ITEM_SPACING}
				decelerationRate="fast"
				scrollEventThrottle={16}
			/>
			<Animated.View
				onLayout={(e) => {
					setActionsY(e.nativeEvent.layout.y);
				}}
				style={actionsStyle}
				className="flex-row mx-4 g-3 items-center"
			>
				<IconButton
					onPress={() =>
						ref.current?.scrollToOffset({
							offset: (ITEM_SIZE + ITEM_SPACING) * (currentIndex - 1),
							animated: true,
						})
					}
					size="large"
					icon="chevron-left"
				/>
				<View className="bg-gray-100 dark:bg-gray-900 rounded-full flex-1 h-full overflow-hidden">
					<Animated.View
						style={progressBarStyle}
						className="absolute left-0 top-0 bottom-0 right-0 bg-acapulco-400/80"
					/>
					<Text className="mt-3 font-body-bold self-center text-gray-50">
						{currentIndex + 1} / {data?.instructions?.length}
					</Text>
				</View>
				<IconButton
					onPress={() =>
						ref.current?.scrollToOffset({
							offset: (ITEM_SIZE + ITEM_SPACING) * (currentIndex + 1),
							animated: true,
						})
					}
					size="large"
					icon="chevron-right"
				/>
			</Animated.View>
			<IngredientsSheet
				position={bottomSheetPosition}
				ingredients={data?.ingredients}
			/>
		</View>
	);
}

export default Cook;
