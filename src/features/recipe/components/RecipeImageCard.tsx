import { Image } from "expo-image";
import { Pressable, View } from "react-native";

import Text from "~/components/Text";
import { SCREEN_WIDTH, isTablet } from "~/theme";
import { Recipe } from "../recipe.types";

export default function RecipeImageCard({
	recipe,
	onPress,
}: {
	recipe?: Recipe;
	onPress?: () => void;
}) {
	const cardWidth = SCREEN_WIDTH / 2;

	return (
		<Pressable
			className="rounded-2xl flex-row bg-white"
			style={isTablet ? { width: cardWidth } : {}}
			onPress={onPress}
		>
			{recipe?.image_url && (
				<Image
					className="w-24 h-full md:w-32 rounded-2xl mr-4"
					style={{ minHeight: isTablet ? 128 : 96 }}
					source={{ uri: recipe?.image_url }}
				/>
			)}
			<View className="flex-1 p-2 pl-0 border-b border-gray-100">
				<Text className="md:text-xl" numberOfLines={2} type="header" size="l">
					{recipe?.name}
				</Text>
				<Text className="text-zinc-800" size="s">
					{recipe?.total_time} | {recipe?.recipe_yield} servings
				</Text>
				<Text
					className="m-w text-zinc-600 max-w-md"
					size="s"
					numberOfLines={isTablet ? 3 : 2}
				>
					{recipe?.description}
				</Text>
			</View>
		</Pressable>
	);
}
