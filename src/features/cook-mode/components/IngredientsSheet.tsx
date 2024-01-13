import React, { useMemo, useState } from "react";
import { View } from "react-native";
import Animated, {
	Extrapolate,
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

export type IngredientsSheetProps = {
	position: Animated.SharedValue<number>;
	ingredients?: Ingredient[];
};

function IngredientsSheet({ position, ingredients }: IngredientsSheetProps) {
	const [completeIngredientIds, setCompleteIngredientIds] = useState<number[]>(
		[],
	);
	const sheetIndex = useSharedValue(0);

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
				<Text className="font-display text-2xl mx-4 my-2">All Ingredients</Text>
				<Animated.FlatList
					style={flatListStyle}
					contentContainerStyle={{ paddingBottom: 30 }}
					keyExtractor={(item, index) => `${item}-${index}`}
					data={ingredients}
					renderItem={({ item }) => {
						const isComplete = completeIngredientIds.includes(item.id);
						return (
							<View className="flex-row justify-between mx-4 mb-4 g-4">
								<Check
									onPress={() => toggleIngredient(item.id)}
									selected={isComplete}
								/>
								<Text
									className={"font-body text-base flex-1"}
									style={{
										textDecorationLine: isComplete ? "line-through" : undefined,
									}}
								>
									{`${item.amount ?? ""} ${item.unit ?? ""} ${
										item.name
									}`.trim()}
								</Text>
							</View>
						);
					}}
				/>
			</View>
		</BottomSheet>
	);
}

export default IngredientsSheet;
