import { useLocalSearchParams } from "expo-router";
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import Text from "../components/Text";
import theme from "../theme";
import { getRecipes } from "../features/recipe/recipe.service";
import RecipeImageCard from "../features/recipe/components/RecipeImageCard";
import Check from "../components/Check";
import Button from "../components/Button";
import useSafeAreaInsets from "../hooks/useSafeAreaInsets";
import { Recipe } from "../features/recipe/recipe.types";

function keyExtractor(recipe: Recipe) {
  return recipe.id.toString();
}

function SelectRecipe() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ date: string }>();
  const date = new Date(params.date);

  const { data } = useQuery(["recipes"], () => getRecipes());

  function renderRecipe({ item }: ListRenderItemInfo<Recipe>) {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.recipeContainer,
          pressed && { opacity: 0.8 },
        ]}
      >
        <RecipeImageCard recipe={item} />
        <Check selected={false} />
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title} type="header" size="xl">
        Select Recipes for {format(date, "EEEE")}
      </Text>
      <FlatList
        data={data}
        renderItem={renderRecipe}
        keyExtractor={keyExtractor}
      />
      <Button
        style={[styles.saveButton, { bottom: insets.bottom }]}
        onPress={() => {}}
        size="large"
      >
        Save
      </Button>
    </View>
  );
}

export default SelectRecipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.xl,
  },
  title: {
    marginBottom: theme.spacing.m,
  },
  recipeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  saveButton: {
    position: "absolute",
    marginHorizontal: theme.spacing.m,
    left: 0,
    right: 0,
  },
});
