import { useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";

import { getRecipes } from "../features/recipe/recipe.service";
import { useRefreshOnFocus } from "../hooks/useRefreshOnFocus";
import theme, { SCREEN_WIDTH } from "../theme";
import { Recipe } from "../../types/Recipe";
import { AddRecipe } from "../features/recipe/components/AddRecipe";
import { AnimatedText } from "../components/Text";
import TextInput from "../components/Input";
import Button from "../components/Button";
import FloatingButton from "../components/FloatingButton";

const extractKey = (item: Recipe) => item.id;

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function Home() {
  const { push } = useRouter();
  const [isSearching, setIsSearching] = useState(false);
  const [step, setStep] = useState<"enterUrl" | "editRecipe">();

  const { data, refetch } = useQuery(["recipes"], getRecipes);
  useRefreshOnFocus(refetch);

  function cancelSearch() {
    setIsSearching(false);
    Keyboard.dismiss();
  }

  function renderItem({ item, index }: ListRenderItemInfo<Recipe>) {
    return (
      <Pressable
        style={styles.recipeCard}
        onPress={() => push(`/recipe/${item.id}`)}
      >
        <Animated.View
          style={{ flex: 1 }}
          sharedTransitionTag={`${item.image_url}`}
        >
          <Image
            style={styles.recipeImage}
            source={{ uri: item.image_url ?? "" }}
          />
        </Animated.View>
      </Pressable>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <FloatingButton onPress={() => setStep("enterUrl")}>
          Add recipe
        </FloatingButton>
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
          <FlatList
            data={data}
            keyExtractor={extractKey}
            columnWrapperStyle={styles.recipeListContent}
            renderItem={renderItem}
            numColumns={2}
            decelerationRate="fast"
          />
        </Animated.View>
      </View>
      <AddRecipe step={step} setStep={setStep} />
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
  recipeCard: {
    aspectRatio: 1,
    width: SCREEN_WIDTH / 2 - theme.spacing.m * 1.5,
    borderRadius: 40,
    marginBottom: theme.spacing.m,
  },
  recipeImage: {
    flex: 1,
    height: undefined,
    width: undefined,
    borderRadius: 40,
  },
});
