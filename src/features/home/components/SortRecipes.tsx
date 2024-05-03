import { BottomSheetModal as _BotomSheetModal } from "@gorhom/bottom-sheet";
import { ImpactFeedbackStyle, impactAsync } from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useRef } from "react";
import { Pressable, View } from "react-native";

import BottomSheetModal from "~/components/BottomSheetModal";
import Text from "~/components/Text";
import { SortOptionValue } from "~/features/recipe/recipe.service";
import { colors } from "~/theme";
import { hexToRGBA } from "~/utils/color";
import { HomeSearchParams } from "../types";

type SortOption = {
  label: string;
  value: SortOptionValue;
};

const sortOptions: SortOption[] = [
  { label: "Newest", value: "created_at:desc" },
  { label: "Oldest", value: "created_at:asc" },
  { label: "Rating", value: "rating:desc" },
  { label: "Total time (shortest)", value: "total_time:asc" },
];

function SortRecipes() {
  const { colorScheme } = useColorScheme();
  const router = useRouter();
  const { s } = useLocalSearchParams<HomeSearchParams>();
  const bottomSheetRef = useRef<_BotomSheetModal>(null);

  const color = colorScheme === "dark" ? colors.gray[950] : colors.white;

  function handleSort(value: SortOptionValue) {
    impactAsync(ImpactFeedbackStyle.Light);
    router.setParams<HomeSearchParams>({ s: value });
    bottomSheetRef.current?.dismiss();
  }

  return (
    <>
      <Pressable
        onPress={() => bottomSheetRef.current?.present()}
        className="absolute right-0 top-0 bottom-0 "
      >
        <LinearGradient
          className="flex-1 justify-center pl-10 pr-1"
          start={{ x: 0, y: 1 }}
          end={{ x: 0.4, y: 1 }}
          colors={[hexToRGBA(color, 0.1), color]}
        >
          <Text className="font-body-bold text-gray-600 dark:text-gray-300 mt-1">
            SORT
          </Text>
        </LinearGradient>
      </Pressable>
      <BottomSheetModal ref={bottomSheetRef}>
        <Text className="font-display text-2xl mt-1 mb-2">Sort recipes by</Text>
        {sortOptions.map((sortOption) => (
          <Pressable
            onPress={() => handleSort(sortOption.value)}
            key={sortOption.label}
            className="flex-row items-center mb-2"
          >
            <View className="flex-row items-center py-2">
              <View className="border-2 border-acapulco-500 rounded-full h-5 w-5 mr-3" />
              {(s === sortOption.value ||
                (!s && sortOption.value === "created_at:desc")) && (
                <View className="bg-acapulco-500 rounded-full h-3 w-3 absolute left-[4]" />
              )}
            </View>
            <Text className="text-base dark:text-gray-200">
              {sortOption.label}
            </Text>
          </Pressable>
        ))}
      </BottomSheetModal>
    </>
  );
}

export default SortRecipes;
