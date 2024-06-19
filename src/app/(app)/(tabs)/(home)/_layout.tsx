import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Slot, router, useGlobalSearchParams } from "expo-router";
import { useRef } from "react";
import { View } from "react-native";

import IconButton from "~/components/IconButton";
import Text from "~/components/Text";
import type { HomeSearchParams } from "~/features/home/types";
import LogRecipe from "~/features/recipe/components/LogRecipe";
import RecipeDetailMenu from "~/features/recipe/components/RecipeDetail/Menu";
import RecipeDetail from "~/features/recipe/components/RecipeDetail/RecipeDetail";
import useFetchRecipe from "~/features/recipe/hooks/useFetchRecipe";
import { isTablet, isWeb } from "~/theme";

export default function HomeTabLayout() {
  const ref = useRef<BottomSheetModal>(null);

  const params = useGlobalSearchParams<HomeSearchParams>();
  const recipeId = params.recipe;
  const { data } = useFetchRecipe(Number(recipeId));

  return (
    <View className="flex-1 flex-row">
      <View className="flex-1 max-w-xl md:border-r md:border-r-gray-100 md:dark:border-r-gray-800">
        <Slot />
      </View>
      {recipeId && isTablet && (
        <View
          style={{ paddingTop: isTablet && isWeb ? 40 : 0 }}
          className="flex-1 pt-0"
        >
          <View className="flex-row justify-between px-4 py-2">
            <Text type="header" className="text-5xl">
              {data?.name}
            </Text>
            <View className="flex-row items-center gap-2 ml-auto">
              <IconButton
                size="medium"
                icon="Maximize2"
                onPress={() => router.navigate(`/recipe/${recipeId}/`)}
              />
              <RecipeDetailMenu
                recipeId={Number(recipeId)}
                onShowLogRecipe={ref.current?.present}
              />
            </View>
          </View>
          <RecipeDetail testID="home-recipe-detail" id={Number(recipeId)} />
        </View>
      )}
      <LogRecipe recipeId={Number(recipeId)} ref={ref} />
    </View>
  );
}
