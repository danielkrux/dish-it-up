import { Image, StyleSheet, View } from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Stack as RouterStack, useLocalSearchParams } from "expo-router";
// import { Image } from "expo-image";

import { getRecipe } from "../../features/recipe/recipe.service";
import type { Recipe } from "../../../types/Recipe";
import Text from "../../components/Text";
import theme from "../../theme";
import Animated from "react-native-reanimated";

export default function Recipe() {
  const { id } = useLocalSearchParams();
  const queryClient = useQueryClient();
  const { data } = useQuery(["recipes", id], () => getRecipe(id as string), {
    initialData: () =>
      queryClient.getQueryData<Recipe[]>(["recipes"])?.find((r) => r.id === id),
  });

  return (
    <View style={styles.container}>
      <RouterStack.Screen options={{ title: "Recipe" }} />
      <Text style={styles.title} type="header">
        {data?.name}
      </Text>
      <Animated.View sharedTransitionTag={`${data?.image_url}`} style={{}}>
        <Image source={{ uri: data?.image_url ?? "" }} style={styles.image} />
      </Animated.View>
      <Text>{data?.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: theme.spacing.m,
    marginVertical: theme.spacing.m,
  },
  title: {
    marginBottom: theme.spacing.m,
  },
  image: {
    width: "100%",
    aspectRatio: 1.8,
    borderRadius: 40,
    marginBottom: theme.spacing.m,
  },
});
