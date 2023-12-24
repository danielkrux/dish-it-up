import { clsx } from "clsx";
import { Image } from "expo-image";
import { Pressable, View } from "react-native";

import Text from "~/components/Text";
import useHomeContext from "~/features/home/hooks/useHomeContext";
import { SCREEN_WIDTH, isTablet } from "~/theme";
import { Recipe } from "../recipe.types";

export type RecipeImageCardProps = {
	recipe?: Recipe;
	onPress?: () => void;
	classsName?: string;
};

export default function RecipeImageCard({
	recipe,
	onPress,
	classsName,
}: RecipeImageCardProps) {
	const { recipeId } = useHomeContext();
	const cardWidth = SCREEN_WIDTH / 2.2;

	const selected = recipeId === recipe?.id;

	return (
		<Pressable
			className={clsx(
				"md:px-2 md:py-2 rounded-2xl overflow-hidden flex-row bg-white",
				{
					"bg-primary": selected,
				},
				classsName,
			)}
			style={isTablet ? { width: cardWidth, borderRadius: 24 } : {}}
			onPress={onPress}
			android_ripple={{ color: "#ccc" }}
		>
			{recipe?.image_url && (
				<Image
					className="w-24 h-full md:w-32 rounded-2xl mr-4"
					style={{ minHeight: isTablet ? 128 : 96 }}
					source={{ uri: recipe?.image_url }}
				/>
			)}
			<View
				className={clsx("flex-1 p-2 pl-0  border-b border-gray-100", {
					"border-primary": selected,
				})}
			>
				<Text
					className="md:text-xl mb-1"
					numberOfLines={2}
					type="header"
					size="l"
				>
					{recipe?.name}
				</Text>
				<Text className="text-zinc-800 mb-1" size="s">
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
