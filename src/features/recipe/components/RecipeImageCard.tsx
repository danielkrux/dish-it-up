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
					className="w-24 md:w-36 aspect-square rounded-2xl mr-4"
					source={{ uri: recipe?.image_url }}
				/>
			)}
			<View className="flex-1 p-2 pl-0 border-b border-gray-100">
				<Text numberOfLines={2} type="header" size="l">
					{recipe?.name}
				</Text>
			</View>
		</Pressable>
	);
}
