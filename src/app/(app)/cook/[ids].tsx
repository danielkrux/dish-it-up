import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useKeepAwake } from "expo-keep-awake";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Button from "~/components/Button";
import IconButton from "~/components/IconButton";
import { useCookModeContext } from "~/features/cook-mode/CookModeContext";
import CookModeScreen from "~/features/cook-mode/components/CookModeScreen";
import Header from "~/features/cook-mode/components/Header";
import useFetchRecipes from "~/features/recipe/hooks/useFetchRecipes";

const extraPadding = Platform.OS === "ios" ? 0 : 10;

function CookMode() {
  useKeepAwake();

  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ ids?: string }>();
  const ids = params.ids?.split(",").map(Number);

  const { recipeSelectionIds, setRecipeSelectionIds } = useCookModeContext();

  useEffect(() => {
    if (recipeSelectionIds.length > 0) {
      router.setParams({ ids: recipeSelectionIds.join(",") });
      setRecipeSelectionIds([]);
    }
  }, [recipeSelectionIds, router, setRecipeSelectionIds]);

  const { data } = useFetchRecipes(ids);

  return (
    <View
      className="flex-1 md:mt-4 bg-white dark:bg-gray-950"
      style={{ paddingTop: insets.top + extraPadding }}
    >
      <Header />
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
