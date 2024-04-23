import { Slot, useRouter } from "expo-router";
import { View } from "react-native";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";

import IconButton from "~/components/IconButton";
import useHomeContext from "~/features/home/hooks/useHomeContext";
import RecipeDetailMenu from "~/features/recipe/components/RecipeDetail/Menu";
import RecipeDetail from "~/features/recipe/components/RecipeDetail/RecipeDetail";

export default function HomeTabLayout() {
  const router = useRouter();
  const { recipeId, setRecipeId } = useHomeContext();

  function handleDelete() {
    setRecipeId(undefined);
  }

  return (
    <View className="flex-1 flex-row">
      <Slot />
      {recipeId && (
        <Animated.View
          entering={SlideInRight}
          exiting={SlideOutRight}
          className="flex-1 bg-white dark:bg-gray-900 z-50"
        >
          <View className="flex-row justify-between px-4 py-2">
            <IconButton
              size="medium"
              icon="X"
              onPress={() => setRecipeId(undefined)}
            />
            <View className="flex-row g-2">
              <IconButton
                size="medium"
                icon="Maximize2"
                onPress={() => router.push(`/recipe/${recipeId}/`)}
              />
              <RecipeDetailMenu
                recipeId={recipeId}
                onDeleteSucces={handleDelete}
              />
            </View>
          </View>
          <RecipeDetail id={recipeId} />
        </Animated.View>
      )}
    </View>
  );
}
