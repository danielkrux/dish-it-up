import { router, useLocalSearchParams } from "expo-router";
import React, { useRef } from "react";
import { ListRenderItemInfo, Platform, View } from "react-native";
import Animated, {
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

import IconButton from "~/components/IconButton";
import Text from "~/components/Text";
import useFetchRecipe from "~/features/recipe/hooks/useFetchRecipe";
import useSafeAreaInsets from "~/hooks/useSafeAreaInsets";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "~/theme";
import Button from "~/components/Button";
import { FlatList } from "react-native-gesture-handler";
import IngredientsSheet from "~/features/cook-mode/components/IngredientsSheet";

const ITEM_SIZE = SCREEN_WIDTH * 0.8;
const ITEM_SPACING = (SCREEN_WIDTH - ITEM_SIZE) / 2;

function Cook() {
	const params = useLocalSearchParams();
	const id = Number(params.id);

	const insets = useSafeAreaInsets();
	const extraPadding = Platform.OS === "ios" ? 0 : 10;

	const ref = useRef<FlatList<string>>(null);
	const index = useSharedValue(0);

	const bottomSheetPosition = useSharedValue(0);

	const [actionsY, setActionsY] = React.useState(0);

	const { data } = useFetchRecipe(id);

	const handleScroll = useAnimatedScrollHandler((e) => {
		index.value = e.contentOffset.x / e.layoutMeasurement.width;
	});

	const actionsStyle = useAnimatedStyle(() => {
		return {
			opacity: withTiming(bottomSheetPosition.value > actionsY + 50 ? 1 : 0),
			transform: [{ translateY: bottomSheetPosition.value - actionsY - 70 }],
		};
	});

	function renderInstruction(item: ListRenderItemInfo<string>) {
		return (
			<View style={{ width: ITEM_SIZE }}>
				<Text className="font-display text-5xl text-gray-400 self-start">
					Step {item.index + 1}
				</Text>
				<Text className="font-body text-xl">{item.item}</Text>
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
				<IconButton size="large" icon="chevron-left" />
				<View className="bg-gray-100 dark:bg-gray-900 rounded-full flex-1 h-full items-center py-3">
					<Text className="font-body-bold text-gray-400">
						{/* {stepIndex} / {data?.instructions?.length} */}
					</Text>
				</View>
				<IconButton size="large" icon="chevron-right" />
			</Animated.View>
			<IngredientsSheet
				position={bottomSheetPosition}
				ingredients={data?.ingredients}
			/>
		</View>
	);
}

export default Cook;
