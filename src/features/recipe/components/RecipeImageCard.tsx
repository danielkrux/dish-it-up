import { Image } from "expo-image";
import { TouchableOpacity, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import Text from "~/components/Text";
import { isTablet } from "~/theme";
import { Recipe } from "../recipe.types";
import { HomeSearchParams } from "~/features/home/types";
import { cn } from "~/utils/tailwind";

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
  const { recipe: recipeId } = useLocalSearchParams<HomeSearchParams>();

  const selected = isTablet && Number(recipeId) === recipe?.id;

  return (
    <TouchableOpacity
      className={cn(
        "p-0 md:px-2 md:py-2 rounded-2xl flex-row bg-white dark:bg-gray-950 md:rounded-3xl",
        classsName,
        {
          "bg-gray-100 dark:bg-gray-800": selected,
        }
      )}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        className="w-24 h-full md:w-32 rounded-2xl mr-4 min-h-[96px] md:min-h[128px]"
        source={recipe?.images?.[0]}
        placeholder="L086]0pHfQpHu2fQfQfQfQfQfQfQ"
      />
      <View className="flex-1 p-2 pl-0">
        <Text
          className="text-base leading-5 md:text-xl mb-1"
          numberOfLines={2}
          type="header"
        >
          {recipe?.name}
        </Text>
        {recipe?.total_time && recipe.recipe_yield && (
          <Text className="text-xs text-gray-600 dark:text-gray-300 mb-2">
            {recipe?.total_time} | {recipe?.recipe_yield} servings
          </Text>
        )}
        <Text
          className="text-xs leading-5 text-gray-800 dark:text-gray-200 max-w-md"
          numberOfLines={isTablet ? 3 : 2}
        >
          {recipe?.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
