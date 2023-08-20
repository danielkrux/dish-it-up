import { ScrollView, StyleSheet, View } from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Stack as RouterStack, Stack, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";

import { getRecipe } from "../../features/recipe/recipe.service";
import type { Recipe } from "../../../types/Recipe";
import Text from "../../components/Text";
import theme from "../../theme";

export default function Recipe() {
  const { id } = useLocalSearchParams();
  const queryClient = useQueryClient();
  const { data } = useQuery(["recipes", id], () => getRecipe(id as string), {
    initialData: () =>
      queryClient.getQueryData<Recipe[]>(["recipes"])?.find((r) => r.id === id),
  });

  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.container}
        contentContainerStyle={{ marginHorizontal: theme.spacing.m }}
      >
        <Stack.Screen options={{ title: "Recipe" }} />
        <View>
          <Text style={styles.title} type="header">
            {data?.name}
          </Text>
          {data?.image_url && (
            <Image source={{ uri: data?.image_url }} style={styles.image} />
          )}
        </View>
        <Text style={styles.description}>{data?.description}</Text>
        <View style={styles.ingredients}>
          <Text type="header" size="l">
            Ingredients
          </Text>
          {data?.ingredients?.map((ingredient, i) => (
            <Text key={i} type="body">
              {ingredient}
            </Text>
          ))}
        </View>
        <View>
          <Text type="header" size="l">
            Instructions
          </Text>
          {data?.instructions?.map((instruction, i) => (
            <View key={i} style={styles.instruction}>
              <Text type="header" size="m">
                {i + 1}
              </Text>
              <Text style={styles.instructionText} key={i} type="body">
                {instruction}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: theme.spacing.m,
  },
  title: {
    marginBottom: theme.spacing.m,
  },
  description: {
    marginBottom: theme.spacing.m,
  },
  image: {
    width: "100%",
    aspectRatio: 1.8,
    borderRadius: 40,
    marginBottom: theme.spacing.m,
  },
  ingredients: {
    marginBottom: theme.spacing.l,
  },
  instruction: {
    marginBottom: theme.spacing.s,
    flexDirection: "row",
    gap: theme.spacing.s,
  },
  instructionText: {
    flex: 1,
  },
});
