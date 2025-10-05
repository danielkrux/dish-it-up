import React from "react";
import { Pressable, View } from "react-native";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

import BottomSheetModal from "~/components/BottomSheetModal";
import Text from "~/components/Text";

import useSortRecipes from "../hooks/useSortRecipes";

function SortRecipes({
  ref,
}: {
  ref: React.RefObject<BottomSheetModalMethods | null>;
}) {
  const { sortOptions, handleSort, isSelected } = useSortRecipes({
    onSortComplete: () => ref.current?.dismiss(),
  });

  return (
    <>
      <BottomSheetModal ref={ref}>
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
