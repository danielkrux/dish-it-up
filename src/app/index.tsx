import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {
  FlatList,
  Keyboard,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";

import { Recipe } from "../../types/Recipe";
import Button from "../components/Button";
import FloatingButton from "../components/FloatingButton";
import InputBase from "../components/Inputs/TextInputBase";
import { AnimatedText } from "../components/Text";
import RecipeImageCard from "../features/recipe/components/RecipeImageCard";
import { getRecipes } from "../features/recipe/recipe.service";
import useDebounce from "../hooks/useDebounce";
import { useRefreshOnFocus } from "../hooks/useRefreshOnFocus";
import theme from "../theme";

const extractKey = (item: Recipe) => item.id;

const AnimatedView = Animated.createAnimatedComponent(TouchableOpacity);

export default function Home() {
  const [isSearching, setIsSearching] = useState(false);
  const { q } = useLocalSearchParams<{ q?: string }>();
  const query = useDebounce(q, 300);

  const { data, refetch } = useQuery(["recipes", query], () =>
    getRecipes(query)
  );
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
      <AnimatedView style={{ flex: 1 }} layout={Layout.duration(200)}>
        <View style={styles.searchContainer}>
          <InputBase
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
      </AnimatedView>
      <FloatingButton onPress={() => router.push("/recipe/add/")}>
        Add recipe
      </FloatingButton>
    </View>
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
