import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CATEGORIES_QUERY_KEY } from "~/features/app/app.constants";
import { DEFAULT_FILTER } from "~/features/home/home.constants";
import { HomeSearchParams } from "~/features/home/types";
import { getCategories } from "~/features/recipe/recipe.service";

function useFilterRecipes() {
  const router = useRouter();
  const params = useLocalSearchParams<HomeSearchParams>();

  const { data } = useQuery([CATEGORIES_QUERY_KEY], getCategories, {
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

  function onFilter(selected: { label: string; value: string }) {
    if (params.c === DEFAULT_FILTER) {
      return router.setParams({ c: DEFAULT_FILTER });
    }

    router.setParams({ c: selected.value });
  }

  function isSelected(filterOption: { label: string; value: string }) {
    return (
      params.c === filterOption.value ||
      (!params.c && filterOption.value === DEFAULT_FILTER)
    );
  }

  return { data, onFilter, isSelected };
}

export default useFilterRecipes;
