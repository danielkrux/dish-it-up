import { clsx } from "clsx";
import { Image } from "expo-image";
import {
	Pressable,
	TouchableHighlight,
	TouchableOpacity,
	View,
} from "react-native";

import Animated from "react-native-reanimated";
import Text from "~/components/Text";
import useHomeContext from "~/features/home/hooks/useHomeContext";
import theme, { SCREEN_WIDTH, isTablet } from "~/theme";
import { Recipe } from "../recipe.types";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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
		<TouchableOpacity
			className={clsx(
				"md:px-2 md:py-2 rounded-2xl flex-row bg-white",
				classsName,
				{
					"bg-primary": selected,
				},
			)}
			style={isTablet ? { width: cardWidth, borderRadius: 24 } : {}}
			onPress={onPress}
			activeOpacity={0.7}
		>
			<>
				{recipe?.image_url && (
					<Image
						className="w-24 h-full md:w-32 rounded-2xl mr-4"
						style={{ minHeight: isTablet ? 128 : 96 }}
						source={{ uri: recipe?.image_url }}
					/>
				)}
				<View
					className={clsx("flex-1 p-2 pl-0", {
						"border-primary": selected,
					})}
				>
					<Text className="md:text-xl" numberOfLines={2} type="header" size="l">
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
			</>
		</TouchableOpacity>
	);
}
