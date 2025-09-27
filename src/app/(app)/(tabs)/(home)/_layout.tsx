import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Stack, router, useGlobalSearchParams } from "expo-router";
import { useRef } from "react";
import { Pressable, View } from "react-native";
import Icon from "~/components/Icon";

import IconButton from "~/components/IconButton";
import Text from "~/components/Text";
import type { HomeSearchParams } from "~/features/home/types";
import LogRecipe from "~/features/recipe/components/LogRecipe";
import RecipeDetailMenu from "~/features/recipe/components/RecipeDetail/Menu";
import RecipeDetail from "~/features/recipe/components/RecipeDetail/RecipeDetail";
import useFetchRecipe from "~/features/recipe/hooks/useFetchRecipe";
import theme, { isTablet, isWeb } from "~/theme";

export default function HomeTabLayout() {
  const ref = useRef<BottomSheetModal>(null);

  const params = useGlobalSearchParams<HomeSearchParams>();
  const recipeId = params.recipe;
  const { data } = useFetchRecipe(Number(recipeId));

  return (
    <View className="flex-1 flex-row">
      <View className="flex-1 max-w-xl md:border-r md:border-r-gray-100 md:dark:border-r-gray-800">
        <Stack
          screenOptions={{
            headerShadowVisible: false,
            headerTitle: "Home",
            headerTitleStyle: {
              fontFamily: "Heading",
              fontSize: theme.fontSize.xxl,
              fontWeight: "bold",
            },

            headerRight: () => (
              <Pressable
                onPress={() => router.push("/recipe/add")}
                className="ml-1.5"
              >
                <Icon name="Plus" />
              </Pressable>
            ),
          }}
        />
      </View>
      {recipeId && isTablet && (
        <View
          style={{ paddingTop: isTablet && isWeb ? 40 : 0 }}
          className="flex-1 pt-0"
        >
          <View className="flex-row justify-between items-start px-4 py-2">
            <Text
              type="header"
              className="text-5xl max-w-screen-md leading-snug"
            >
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
