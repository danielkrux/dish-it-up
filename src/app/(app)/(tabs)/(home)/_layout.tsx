import { Slot, router, useGlobalSearchParams } from "expo-router";
import { View } from "react-native";

import IconButton from "~/components/IconButton";
import { HomeSearchParams } from "~/features/home/types";
import RecipeDetailMenu from "~/features/recipe/components/RecipeDetail/Menu";
import RecipeDetail from "~/features/recipe/components/RecipeDetail/RecipeDetail";

export default function HomeTabLayout() {
  const params = useGlobalSearchParams<HomeSearchParams>();

  const recipeId = params.recipe;

  function removeParam() {
    // @ts-ignore
    router.setParams<HomeSearchParams>({ ...params, recipe: undefined });
  }

  return (
    <View className="flex-1 flex-row">
      <View className="flex-1 max-w-xl">
        <Slot />
      </View>
      {recipeId && (
        <View className="flex-1">
          <View className="flex-row justify-between px-4 py-2">
            <View className="flex-row gap-2 ml-auto">
              <IconButton
                size="medium"
                icon="Maximize2"
                onPress={() => router.navigate(`/recipe/${recipeId}/`)}
              />
              <RecipeDetailMenu
                recipeId={Number(recipeId)}
                onDeleteSucces={removeParam}
              />
            </View>
          </View>
          <RecipeDetail id={Number(recipeId)} />
        </View>
      )}
    </View>
  );
}
