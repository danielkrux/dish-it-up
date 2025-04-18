import { BottomSheetModal as _BotomSheetModal } from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Keyboard, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import Button from "~/components/Button";
import InputBase from "~/components/Inputs/TextInputBase";
import RecipeQuickFilter from "./RecipeFilters";

import type { HomeSearchParams } from "../types";
import SortRecipes from "./SortRecipes";

function SeachAndFilter() {
  const router = useRouter();
  const { q } = useLocalSearchParams<HomeSearchParams>();
  const [isSearching, setIsSearching] = useState(false);

  function cancelSearch() {
    setIsSearching(false);
    Keyboard.dismiss();
  }

  return (
    <View>
      <View className="flex-row items-center mb-1.5">
        <Animated.View className="flex-1">
          <InputBase
            className="text-sm"
            value={q}
            onChangeText={(text) => {
              router.setParams({ q: text });
            }}
            onFocus={() => setIsSearching(true)}
            onBlur={() => setIsSearching(false)}
            placeholder="Search recipes"
          />
        </Animated.View>

        {isSearching && (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <Button variant="ghost" onPress={cancelSearch}>
              CANCEL
            </Button>
          </Animated.View>
        )}
      </View>
      <View className="flex-row items-center gap-2">
        <RecipeQuickFilter />
        <SortRecipes />
      </View>
    </View>
  );
}

export default SeachAndFilter;
