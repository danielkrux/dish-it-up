import ChipList from "../../../components/ChipList";
import theme from "../../../theme";
import { getRecipeCategories } from "../../recipe/recipe.service";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet } from "react-native";

function RecipeQuickFilter() {
  const { data } = useQuery(["recipe-categories"], getRecipeCategories, {
    select: (data) =>
      data.map((c) => ({ label: c, value: c, onPress: () => {} })),
  });

  if (!data) return null;

  return (
    <ChipList style={styles.container} contentContainerStyle={styles.contentContainer} data={data} />
  );
}

export default RecipeQuickFilter;

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.m,
  },
  contentContainer: {
    marginHorizontal: theme.spacing.m,
  },
});
