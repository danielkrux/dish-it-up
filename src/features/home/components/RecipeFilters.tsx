import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";

import ChipList from "../../../components/ChipList";
import theme from "../../../theme";
import { getCategories } from "../../recipe/recipe.service";

export const DEFAULT_FILTER = "0";

function RecipeQuickFilter() {
  const params = useLocalSearchParams<{ c?: string }>();
  const appliedCategory = params.c;

  const { data } = useQuery(["categories"], getCategories, {
    select: (data) => {
      const categories = [{ name: "All", id: DEFAULT_FILTER }, ...data];
      return categories.map((category) => ({
        label: category.name,
        value: category.id,
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
