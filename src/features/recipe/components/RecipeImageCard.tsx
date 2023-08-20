import React from "react";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";

import theme, { SCREEN_WIDTH } from "../../../theme";
import Text from "../../../components/Text";
import { Recipe } from "../../../../types/Recipe";
import { hexToRGBA } from "../../../utils/color";

export default function RecipeImageCard({ recipe }: { recipe: Recipe }) {
  const { push } = useRouter();

  return (
    <Pressable
      style={styles.container}
      onPress={() => push(`/recipe/${recipe.id}`)}
    >
      {recipe.image_url && (
        <Image style={styles.image} source={{ uri: recipe.image_url }} />
      )}
      <LinearGradient
        colors={["transparent", hexToRGBA("#000000", 0.9)]}
        style={styles.content}
        locations={[0.2, 1]}
      >
        <Text light>{recipe.name}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    width: SCREEN_WIDTH / 2 - theme.spacing.m * 1.5,
    borderRadius: 20,
    marginBottom: theme.spacing.m,
    overflow: "hidden",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    padding: theme.spacing.m,
  },
});
