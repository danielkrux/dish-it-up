import React, { useMemo } from "react";
import { View } from "react-native";
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";

import Text from "~/components/Text";
import IconButton from "~/components/IconButton";
import { SCREEN_HEIGHT } from "~/theme";
import { Ingredient } from "~/features/recipe/recipe.types";
import BottomSheet from "~/components/BottomSheet";

export type IngredientsSheetProps = {
	position: Animated.SharedValue<number>;
	ingredients?: Ingredient[];
};

function IngredientsSheet({ position, ingredients }: IngredientsSheetProps) {
	const sheetIndex = useSharedValue(0);

	const snapPoints = useMemo(
		() => [SCREEN_HEIGHT * 0.35, SCREEN_HEIGHT * 0.85],
		[],
	);

	const flatListStyle = useAnimatedStyle(() => {
		const height = interpolate(
			sheetIndex.value,
			[0, 1],
			[SCREEN_HEIGHT * 0.35 - 70, SCREEN_HEIGHT * 0.85],
		);
		return {
			height,
		};
	});

	return (
		<BottomSheet
			animateOnMount={false}
			snapPoints={snapPoints}
			handleStyle="bg-gray-100 dark:bg-gray-900"
			handleIndicatorStyle="bg-gray-200 dark:bg-gray-800"
			animatedPosition={position}
			animatedIndex={sheetIndex}
			contentHeight={interpolate(
				sheetIndex.value,
				[0, 1],
				[SCREEN_HEIGHT * 0.35, SCREEN_HEIGHT * 0.85],
			)}
		>
			<View className=" bg-gray-100 dark:bg-gray-900 flex-1">
				<Text className="font-display text-2xl mx-4 my-2">All Ingredients</Text>
				<Animated.FlatList
					style={flatListStyle}
					contentContainerStyle={{ paddingBottom: 30 }}
					data={ingredients}
					renderItem={({ item }) => (
						<View className="flex-row justify-between mx-4 my-1 g-4">
							<Text className="font-body text-base flex-1">
								{`${item.amount ?? ""} ${item.unit ?? ""} ${item.name}`.trim()}
							</Text>
							<IconButton icon="check" size="medium" />
						</View>
					)}
				/>
			</View>
		</BottomSheet>
	);
}

export default IngredientsSheet;
