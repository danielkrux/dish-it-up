import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import Head from "expo-router/head";
import { useRef } from "react";
import Toast from "react-native-toast-message";
import FloatingButton from "~/components/FloatingButton";

import IconButton from "~/components/IconButton";
import LogRecipe from "~/features/recipe/components/LogRecipe";
import RecipeDetailMenu from "~/features/recipe/components/RecipeDetail/Menu";
import RecipeDetail from "~/features/recipe/components/RecipeDetail/RecipeDetail";

export default function RecipeDetailPage() {
  const ref = useRef<BottomSheetModal>(null);

  const params = useLocalSearchParams();
  const id = Number(params.id);
  const router = useRouter();

  function handleDeleteSuccess() {
    router.back();
    Toast.show({
      type: "success",
      text1: "Recipe deleted",
    });
  }

  return (
    <>
      <Head>
        <meta property="expo:handoff" content="true" />
      </Head>
      <Stack.Screen
        options={{
          title: "Recipe",
          headerTitleAlign: "center",
          headerLeft: () => (
            <IconButton
              onPress={router.back}
              icon="ChevronLeft"
              size="medium"
            />
          ),
          headerRight: () => (
            <RecipeDetailMenu
              onShowLogRecipe={ref.current?.present}
              onDeleteSucces={handleDeleteSuccess}
              recipeId={id}
            />
          ),
        }}
      />
      <RecipeDetail id={id} logRecipeRef={ref} />
      <FloatingButton
        onPress={() => router.push(`/recipe/${id}/cook`)}
        useSafeArea
      >
        Start cooking
      </FloatingButton>
      <LogRecipe recipeId={id} ref={ref} />
    </>
  );
}
