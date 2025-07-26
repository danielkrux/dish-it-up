import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useKeepAwake } from "expo-keep-awake";
import { router, useLocalSearchParams } from "expo-router";
import { useRef } from "react";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Button from "~/components/Button";
import IconButton from "~/components/IconButton";
import CookModeScreen from "~/features/cook-mode/components/CookModeScreen";
import useFetchRecipes from "~/features/recipe/hooks/useFetchRecipes";

function CookMode() {
  const logRecipeRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();
  const extraPadding = Platform.OS === "ios" ? 0 : 10;

  useKeepAwake();

  const params = useLocalSearchParams<{ ids?: string }>();
  // console.log(params);
  const ids = params.ids?.split(",").map(Number);

  const { data } = useFetchRecipes(ids);

  function handleAddRecipe() {}

  return (
    <View
      className="flex-1 md:mt-4 bg-white dark:bg-gray-950"
      style={{ paddingTop: insets.top + extraPadding }}
    >
      <View className="flex-row mx-4 lg:mx-8 lg:mt-2 items-center justify-between ">
        <IconButton icon="X" size="medium" onPress={router.back} />
        <View className="flex-row items-center gap-6">
          <IconButton
            size="medium"
            icon="Plus"
            onPress={() => router.push(`/cook/select-recipe?ids=${params.ids}`)}
          />
          <Button
            onPress={() => logRecipeRef.current?.present()}
            variant="secondary"
          >
            Done
          </Button>
        </View>
      </View>
      <CookModeScreen id={ids?.[0]} />
      {/* <LogRecipe
        ref={logRecipeRef}
        recipeId={data?.id}
        onSave={handleLogSave}
      /> */}
    </View>
  );
}

export default CookMode;
