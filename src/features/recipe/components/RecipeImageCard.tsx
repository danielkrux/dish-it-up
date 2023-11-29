import { Image } from "expo-image";
import { Pressable, StyleSheet, View } from "react-native";

import Text from "../../../components/Text";
import theme, { pallettes } from "../../../theme";
import { Recipe } from "../recipe.types";
import useFetchRecipe from "../hooks/useFetchRecipe";

export default function RecipeImageCard({
  recipe,
  recipeId,
  onPress,
}: {
  recipe?: Recipe;
  recipeId?: number;
  onPress?: () => void;
}) {
  const recipeQuery = useFetchRecipe(recipeId);

  const data = recipe || recipeQuery.data;

  if (!data) return null;

  return (
    <Pressable style={styles.container} onPress={onPress}>
      {data?.image_url && (
        <Image
          style={styles.image}
          source={{ uri: data?.image_url, width: 120, height: 120 }}
        />
      )}
      <View style={styles.contentContainer}>
        <Text numberOfLines={2} type="header" size="l">
          {data?.name}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    flexDirection: "row",
    gap: theme.spacing.m,
    flex: 1,
  },
  image: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 15,
  },
  content: {
    justifyContent: "flex-end",
    padding: theme.spacing.m,
  },
  contentContainer: {
    flex: 1,
    padding: theme.spacing.xs,
    paddingLeft: 0,
    borderBottomColor: pallettes.black[100],
    borderBottomWidth: 1,
  },
});
