import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

import ChipList from "../../../components/ChipList";
import theme from "../../../theme";
import { getRecipeCategories } from "../../recipe/recipe.service";

export const DEFAULT_FILTER = "All";

function RecipeQuickFilter() {
  const params = useLocalSearchParams<{ c?: string }>();
  const appliedCategory = params.c;

  const { data } = useQuery(["recipes", "categories"], getRecipeCategories, {
    select: (data) => {
      const categoriesFromRecipes = data.map((category) => category);
      const categories = [DEFAULT_FILTER, ...categoriesFromRecipes];
      return categories.map((category) => ({
        label: category,
        value: category,
      }));
    },
  });

  function updateParams(value: string) {
    if (value === DEFAULT_FILTER)
      return router.setParams({ c: DEFAULT_FILTER });
    router.setParams({ c: value });
  }

  if (!data) return null;

  return (
    <ChipList
      style={styles.container}
      data={data}
      selectedValues={appliedCategory ? [appliedCategory] : [DEFAULT_FILTER]}
      onPress={updateParams}
    />
  );
}

export default RecipeQuickFilter;

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.m,
  },
});
