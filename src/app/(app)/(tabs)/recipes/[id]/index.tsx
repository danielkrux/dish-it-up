import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useRef } from "react";
import Toast from "react-native-toast-message";

import FloatingButton from "~/components/FloatingButton";
import LogRecipe from "~/features/recipe/components/LogRecipe";
import RecipeDetailMenu from "~/features/recipe/components/RecipeDetail/Menu";
import RecipeDetail from "~/features/recipe/components/RecipeDetail/RecipeDetail";
import useFetchRecipe from "~/features/recipe/hooks/useFetchRecipe";

export default function RecipeDetailPage() {
  const ref = useRef<BottomSheetModal>(null);

  const params = useLocalSearchParams();
  const id = Number(params.id);
  const router = useRouter();

  const { data } = useFetchRecipe(id);

  function handleDeleteSuccess() {
    router.back();
    Toast.show({
      type: "success",
      text1: "Recipe deleted",
    });
  }

  function handleAddToMealPlan() {
    Toast.show({
      type: "success",
      text1: "Recipe added to meal plan",
    });
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: data?.name ?? "Recipe Detail",
          headerShadowVisible: false,
          headerTransparent: true,
          headerLargeTitle: true,
          headerTitleStyle: {
            fontFamily: "Heading",
          },
          headerLargeTitleStyle: {
            fontFamily: "Heading",
          },
        }}
      />
      <RecipeDetailMenu
        onShowLogRecipe={ref.current?.present}
        onDeleteSucces={handleDeleteSuccess}
        onAddToMealPlan={handleAddToMealPlan}
        recipeId={id}
      />
      <RecipeDetail id={id} logRecipeRef={ref} />
      <FloatingButton
        onPress={() => router.push(`/recipes/${id}/cook`)}
        useBottomTabsSafeArea
        icon="Play"
        className="md:mb-2"
      >
        Start cooking
      </FloatingButton>
      <LogRecipe recipeId={id} ref={ref} />
    </>
  );
}
