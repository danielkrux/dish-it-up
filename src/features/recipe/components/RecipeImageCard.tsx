import { Image } from "expo-image";
import { Pressable, StyleSheet, View } from "react-native";

import Text from "../../../components/Text";
import theme, { pallettes } from "../../../theme";
import { Recipe } from "../recipe.types";

export default function RecipeImageCard({
  recipe,
  onPress,
}: {
  recipe: Recipe;
  onPress?: () => void;
}) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
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
