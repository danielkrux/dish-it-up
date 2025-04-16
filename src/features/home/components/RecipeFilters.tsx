import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";

import ChipList from "~/components/ChipList";
import { CATEGORIES_QUERY_KEY } from "~/features/app/app.constants";
import { getCategories } from "~/features/recipe/recipe.service";
import type { HomeSearchParams } from "../types";

export const DEFAULT_FILTER = "all";

function RecipeQuickFilter() {
  const params = useLocalSearchParams<HomeSearchParams>();
  const appliedCategory = params.c;

  const { data, isLoading } = useQuery([CATEGORIES_QUERY_KEY], getCategories, {
    select: (data) => {
      const categoriesWithRecipes = data.filter((c) => c.numberOfRecipes > 0);
      const categories = [
        { name: "All", id: DEFAULT_FILTER },
        ...categoriesWithRecipes,
      ];
      return categories.map((category) => ({
        label: category.name,
        value: String(category.id),
      }));
    },
  });

  function updateParams(value: string) {
    if (value === DEFAULT_FILTER)
      return router.setParams<HomeSearchParams>({ c: DEFAULT_FILTER });
    router.setParams<HomeSearchParams>({ c: value });
  }

  if (isLoading)
    return (
      <ChipList
        className="mt-1 pr-"
        data={[
          { label: "", value: "" },
          { label: "", value: "" },
        ]}
        selectedValues={[]}
        onPress={updateParams}
        contentContainerClassName="pr-20"
      />
    );

  if (data && data.length <= 1) return null;

  return (
    <ChipList
      className="mt-1"
      data={data}
      selectedValues={appliedCategory ? [appliedCategory] : [DEFAULT_FILTER]}
      onPress={updateParams}
    />
  );
}

export default RecipeQuickFilter;
