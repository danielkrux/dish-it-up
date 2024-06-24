import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import FloatingButton from "~/components/FloatingButton";
import RecipeDetail from "~/features/recipe/components/RecipeDetail/RecipeDetail";
import type { Recipe } from "~/features/recipe/recipe.types";
import useGetRecipeShare from "~/features/share/hooks/useGetRecipeShare";

function Share() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = Number(params.id);

  const { data } = useGetRecipeShare(id);

  return (
    <View className="flex-1">
      <RecipeDetail formData={data?.full_recipe as Recipe} />
      <FloatingButton>Add to recipes</FloatingButton>
    </View>
  );
}

export default Share;
