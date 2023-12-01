import { Image } from "expo-image";
import { Pressable, View } from "react-native";

import Text from "../../../components/Text";
import { Recipe } from "../recipe.types";
import useFetchRecipe from "../hooks/useFetchRecipe";

export default function RecipeImageCard({
  recipe,
  recipeId,
  onPress,
}: {
  recipe?: Recipe;
  recipeId?: number;
  onPress?: () => void;
}) {
  const recipeQuery = useFetchRecipe(recipeId);

  const data = recipe || recipeQuery.data;

  if (!data) return null;

  return (
    <Pressable
      className="rounded-2xl flex-row bg-white flex-1"
      onPress={onPress}
    >
      {data?.image_url && (
        <Image
          className="w-24 aspect-square rounded-2xl mr-4"
          source={{ uri: data?.image_url }}
        />
      )}
      <View className="flex-1 p-2 pl-0 border-b border-gray-100">
        <Text numberOfLines={2} type="header" size="l">
          {data?.name}
        </Text>
      </View>
    </Pressable>
  );
}
