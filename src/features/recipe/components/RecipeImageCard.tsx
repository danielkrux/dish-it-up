import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import { Recipe } from "../../../../types/Recipe";
import Text from "../../../components/Text";
import theme from "../../../theme";

export default function RecipeImageCard({ recipe }: { recipe: Recipe }) {
  const { push } = useRouter();

  return (
    <Pressable
      style={styles.container}
      onPress={() => push(`/recipe/${recipe.id}/`)}
    >
      {recipe.image_url && (
        <Image
          style={styles.image}
          source={{ uri: recipe.image_url, width: 120, height: 120 }}
        />
      )}
      <View style={styles.contentContainer}>
        <Text numberOfLines={2} type="header" size="l">
          {recipe.name}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginBottom: theme.spacing.m,
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
  },
});
