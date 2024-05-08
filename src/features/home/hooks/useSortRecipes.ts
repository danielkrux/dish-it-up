import { router, useLocalSearchParams } from "expo-router";
import { ImpactFeedbackStyle, impactAsync } from "expo-haptics";

import { HomeSearchParams } from "../types";
import { SortOptionValue } from "~/features/recipe/recipe.service";
import { Platform } from "react-native";
import { IconName } from "~/components/Icon";

const DEFAULT_SORT: SortOptionValue = "created_at:desc";

type SortOption = {
  icon: IconName;
  label: string;
  value: SortOptionValue;
};

const sortOptions: SortOption[] = [
  { icon: "ArrowBigUp", label: "Newest", value: "created_at:desc" },
  { icon: "ArrowBigDown", label: "Oldest", value: "created_at:asc" },
  { icon: "Star", label: "Rating", value: "rating:desc" },
  { icon: "Timer", label: "Total time (shortest)", value: "total_time:asc" },
];

function useSortRecipes({ onSortComplete }: { onSortComplete: () => void }) {
  const { s } = useLocalSearchParams<HomeSearchParams>();

  function handleSort(value: SortOptionValue) {
    if (Platform.OS !== "web") {
      impactAsync(ImpactFeedbackStyle.Light);
    }
    router.setParams<HomeSearchParams>({ s: value });
    onSortComplete();
  }

  function isSelected(sortOption: SortOption) {
    return s === sortOption.value || (!s && sortOption.value === DEFAULT_SORT);
  }

  return { sortOptions, s, DEFAULT_SORT, handleSort, isSelected };
}

export default useSortRecipes;
