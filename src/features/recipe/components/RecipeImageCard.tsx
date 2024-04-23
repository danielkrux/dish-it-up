import { clsx } from "clsx";
import { Image } from "expo-image";
import { TouchableOpacity, View } from "react-native";

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
    <TouchableOpacity
      className={clsx(
        "md:px-2 md:py-2 rounded-2xl flex-row bg-white dark:bg-gray-950",
        classsName,
        {
          "bg-acapulco-100": selected,
        }
      )}
      style={isTablet ? { width: cardWidth, borderRadius: 24 } : {}}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <>
        <Image
          className="w-24 h-full md:w-32 rounded-2xl mr-4"
          style={{ minHeight: isTablet ? 128 : 96 }}
          source={recipe?.images?.[0]}
          placeholder="L086]0pHfQpHu2fQfQfQfQfQfQfQ"
        />
        <View
          className={clsx("flex-1 p-2 pl-0", {
            "border-primary": selected,
          })}
        >
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
      </>
    </TouchableOpacity>
  );
}
