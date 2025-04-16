import type { BottomSheetModal as _BotomSheetModal } from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { useColorScheme } from "nativewind";
import React, { useRef } from "react";
import { Pressable, View } from "react-native";

import BottomSheetModal from "~/components/BottomSheetModal";
import Text from "~/components/Text";
import { colors } from "~/theme";
import { hexToRGBA } from "~/utils/color";
import useSortRecipes from "../hooks/useSortRecipes";

function SortRecipes() {
  const { colorScheme } = useColorScheme();
  const bottomSheetRef = useRef<_BotomSheetModal>(null);

  const { sortOptions, handleSort, isSelected } = useSortRecipes({
    onSortComplete: () => bottomSheetRef.current?.dismiss(),
  });

  const color = colorScheme === "dark" ? colors.gray[950] : colors.white;

  return (
    <>
      <Pressable onPress={() => bottomSheetRef.current?.present()}>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 0.4, y: 1 }}
          colors={[hexToRGBA(color, 0.1), color]}
        >
          <Text className="font-body-bold text-gray-600 dark:text-gray-300">
            SORT
          </Text>
        </LinearGradient>
      </Pressable>
      <BottomSheetModal ref={bottomSheetRef}>
        <Text className="font-display text-3xl mt-2 mb-4">Sort recipes by</Text>
        {sortOptions.map((sortOption) => (
          <Pressable
            onPress={() => handleSort(sortOption.value)}
            key={sortOption.label}
            className="flex-row items-center mb-4"
          >
            <View className="items-center justify-center py-2 border-2 border-acapulco-500 rounded-full h-5 w-5 mr-3">
              {isSelected(sortOption) && (
                <View className="bg-acapulco-500 rounded-full h-3 w-3 absolute" />
              )}
            </View>
            <Text className="text-base dark:text-gray-200 text-lg">
              {sortOption.label}
            </Text>
          </Pressable>
        ))}
      </BottomSheetModal>
    </>
  );
}

export default SortRecipes;
