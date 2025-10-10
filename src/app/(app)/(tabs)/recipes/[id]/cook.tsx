import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useKeepAwake } from "expo-keep-awake";
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef } from "react";
import { Platform, View } from "react-native";
import type Animated from "react-native-reanimated";
import { useAnimatedReaction, useSharedValue } from "react-native-reanimated";
import Toast from "react-native-toast-message";
import { scheduleOnRN } from "react-native-worklets";
import Button from "~/components/Button";
import IconButton from "~/components/IconButton";

import IngredientsList from "~/features/cook-mode/components/IngredientsList";
import StepsList from "~/features/cook-mode/components/StepsList";
import LogRecipe from "~/features/recipe/components/LogRecipe";
import useFetchRecipe from "~/features/recipe/hooks/useFetchRecipe";
import useSafeAreaInsets from "~/hooks/useSafeAreaInsets";

function Cook() {
  const params = useLocalSearchParams();
  const id = Number(params.id);
  const { data } = useFetchRecipe(id);

  const ref = useRef<Animated.FlatList<string>>(null);
  const logRecipeRef = useRef<BottomSheetModal>(null);

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const index = useSharedValue(0);
  const bottomSheetPosition = useSharedValue(0);

  const insets = useSafeAreaInsets();
  const extraPadding = Platform.OS === "ios" ? 0 : 10;

  useKeepAwake();

  useAnimatedReaction(
    () => index.value,
    (value) => {
      const clampedIndex = Math.max(
        0,
        Math.min(value, (data?.instructions?.length ?? 0) - 1)
      );
      return scheduleOnRN(setCurrentIndex, Math.round(clampedIndex));
    }
  );

  function handleLogSave() {
    router.back();
    Toast.show({
      type: "success",
      text1: "Recipe logged!",
    });
  }

  return (
    <View
      className="flex-1 md:mt-4 bg-white dark:bg-gray-950"
      style={{ paddingTop: insets.top + extraPadding }}
    >
      <View className="flex-row mx-4 lg:mx-8 lg:mt-2 items-center justify-between ">
        <IconButton icon="X" size="medium" onPress={router.back} />
        <Button
          onPress={() => logRecipeRef.current?.present()}
          variant="secondary"
        >
          Done
        </Button>
      </View>
      <View className="flex-1 md:flex-row">
        <StepsList
          ref={ref}
          index={index}
          data={data}
          bottomSheetPosition={bottomSheetPosition}
          currentIndex={currentIndex}
        />
        <IngredientsList
          currentInstruction={data?.instructions?.[currentIndex] ?? ""}
          position={bottomSheetPosition}
          ingredients={data?.ingredients}
          className="md:py-6 md:px-4 md:m-8 md:mb-12 md:rounded-lg md:flex-[0.5]"
        />
      </View>
      <LogRecipe
        ref={logRecipeRef}
        recipeId={data?.id}
        onSave={handleLogSave}
      />
    </View>
  );
}

export default Cook;
