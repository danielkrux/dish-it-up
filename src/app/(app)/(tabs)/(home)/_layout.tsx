import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Slot, router, useGlobalSearchParams } from "expo-router";
import { useRef } from "react";
import { View } from "react-native";

import IconButton from "~/components/IconButton";
import Text from "~/components/Text";
import { HomeSearchParams } from "~/features/home/types";
import LogRecipe from "~/features/recipe/components/LogRecipe";
import RecipeDetailMenu from "~/features/recipe/components/RecipeDetail/Menu";
import RecipeDetail from "~/features/recipe/components/RecipeDetail/RecipeDetail";
import useFetchRecipe from "~/features/recipe/hooks/useFetchRecipe";
import { isTablet } from "~/theme";

export default function HomeTabLayout() {
  const ref = useRef<BottomSheetModal>(null);

  const params = useGlobalSearchParams<HomeSearchParams>();

  const recipeId = params.recipe;

  const { data } = useFetchRecipe(Number(recipeId));

  function removeParam() {
    // @ts-ignore
    router.setParams<HomeSearchParams>({ ...params, recipe: undefined });
  }

  return (
    <View className="flex-1 flex-row">
      <View className="flex-1 max-w-xl md:border-r md:border-r-gray-100 md:dark:border-r-gray-800">
        <Slot />
      </View>
      {recipeId && isTablet && (
        <View className="flex-1 pt-0 lg:pt-10 lg:native:pt-0">
          <View className="flex-row justify-between px-4 py-2">
            <Text type="header" size="2xl">
              {data?.name}
            </Text>
            <View className="flex-row gap-2 ml-auto">
              <IconButton
                size="medium"
                icon="Maximize2"
                onPress={() => router.navigate(`/recipe/${recipeId}/`)}
              />
              <RecipeDetailMenu
                recipeId={Number(recipeId)}
                onShowLogRecipe={ref.current?.present}
                onDeleteSucces={removeParam}
              />
            </View>
          </View>
          <RecipeDetail id={Number(recipeId)} />
        </View>
      )}
      <LogRecipe recipeId={Number(recipeId)} ref={ref} />
    </View>
  );
}
