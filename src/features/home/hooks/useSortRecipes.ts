import { router, useLocalSearchParams } from "expo-router";
import { ImpactFeedbackStyle, impactAsync } from "expo-haptics";

import { HomeSearchParams } from "../types";
import { SortOptionValue } from "~/features/recipe/recipe.service";

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

function useSortRecipes({ onSortComplete }: { onSortComplete: () => void }) {
  const { s } = useLocalSearchParams<HomeSearchParams>();

  function handleSort(value: SortOptionValue) {
    impactAsync(ImpactFeedbackStyle.Light);
    router.setParams<HomeSearchParams>({ s: value });
    onSortComplete();
  }

  function isSelected(sortOption: SortOption) {
    return (
      s === sortOption.value || (!s && sortOption.value === "created_at:desc")
    );
  }

  return { sortOptions, handleSort, isSelected };
}

export default useSortRecipes;
