import ChipList from "../../../components/ChipList";
import { getRecipeCategories } from "../../recipe/recipe.service";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet } from "react-native";

function RecipeQuickFilter() {
  const { data } = useQuery(["recipe-categories"], getRecipeCategories, {
    select: (data) =>
      data.map((c) => ({ label: c, value: c, onPress: () => {} })),
  });

  if (!data) return null;

  return <ChipList data={data} />;
}

export default RecipeQuickFilter;

const styles = StyleSheet.create({});
