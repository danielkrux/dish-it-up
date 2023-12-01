import { Image } from "expo-image";
import { Pressable, View } from "react-native";

import Text from "../../../components/Text";
import { Recipe } from "../recipe.types";

export default function RecipeImageCard({
	recipe,
	onPress,
}: {
	recipe?: Recipe;
	onPress?: () => void;
}) {
	return (
		<Pressable
			className="rounded-2xl flex-row bg-white flex-1"
			onPress={onPress}
		>
			{recipe?.image_url && (
				<Image
					className="w-24 aspect-square rounded-2xl mr-4"
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
