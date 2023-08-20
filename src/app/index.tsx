import { useCallback, useState } from "react";
import {
  FlatList,
  Keyboard,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import { router, useLocalSearchParams } from "expo-router";

import { getRecipes } from "../features/recipe/recipe.service";
import { useRefreshOnFocus } from "../hooks/useRefreshOnFocus";
import theme from "../theme";
import { Recipe } from "../../types/Recipe";
import { AddRecipe } from "../features/recipe/components/AddRecipe";
import { AnimatedText } from "../components/Text";
import TextInput from "../components/Input";
import Button from "../components/Button";
import FloatingButton from "../components/FloatingButton";
import RecipeImageCard from "../features/recipe/components/RecipeImageCard";
import useDebounce from "../hooks/useDebounce";
import ChipList from "../components/ChipList";
import RecipeQuickFilter from "../features/home/components/RecipeFilters";

const extractKey = (item: Recipe) => item.id;

const searcRecipeByName = (recipes: Recipe[], query?: string) => {
  if (!query) return recipes;
  return recipes.filter((r) =>
    r.name?.toLowerCase().includes(query.toLowerCase())
  );
};

export default function Home() {
  const [isSearching, setIsSearching] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { q } = useLocalSearchParams<{ q?: string }>();
  const query = useDebounce(q, 300);

  const { data, refetch } = useQuery(["recipes"], getRecipes, {
    select: useCallback(
      (data: Recipe[]) => searcRecipeByName(data, query),
      [query]
    ),
  });
  useRefreshOnFocus(refetch);

  function cancelSearch() {
    setIsSearching(false);
    Keyboard.dismiss();
  }

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Recipe>) => <RecipeImageCard recipe={item} />,
    []
  );

  return (
    <>
      <View style={styles.container}>
        {!isSearching && (
          <AnimatedText
            exiting={FadeOut.duration(100)}
            entering={FadeIn}
            type="header"
            style={styles.title}
          >
            Get cooking today!
          </AnimatedText>
        )}
        <Animated.View style={{ flex: 1 }} layout={Layout.duration(200)}>
          <View style={styles.searchContainer}>
            <TextInput
              value={q}
              onChangeText={(text) => {
                router.setParams({ q: text });
              }}
              onFocus={() => setIsSearching(true)}
              onBlur={() => setIsSearching(false)}
              placeholder="Search recipes"
              style={styles.search}
            />
            {isSearching && (
              <Button variant="ghost" onPress={cancelSearch}>
                CANCEL
              </Button>
            )}
          </View>
          {/* <RecipeQuickFilter /> */}
          <FlatList
            data={data}
            keyExtractor={extractKey}
            columnWrapperStyle={styles.recipeListContent}
            renderItem={renderItem}
            numColumns={2}
          />
        </Animated.View>
        <FloatingButton onPress={() => setIsAdding(true)}>
          Add recipe
        </FloatingButton>
      </View>
      {isAdding && <AddRecipe onClose={() => setIsAdding(false)} />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginBottom: theme.spacing.m,
    marginHorizontal: theme.spacing.m,
  },
  searchContainer: {
    flexDirection: "row",
    marginHorizontal: theme.spacing.m,
    alignItems: "center",
  },
  search: {
    flex: 1,
    marginBottom: theme.spacing.m,
  },
  recipeListContent: {
    paddingHorizontal: theme.spacing.m,
    justifyContent: "space-between",
  },
});
