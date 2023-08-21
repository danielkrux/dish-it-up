import { ScrollView, StyleSheet, View } from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Stack as RouterStack, Stack, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";

import { getRecipe } from "../../features/recipe/recipe.service";
import type { Recipe } from "../../../types/Recipe";
import Text from "../../components/Text";
import theme, { SCREEN_WIDTH } from "../../theme";

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
        <View style={styles.recipeMeta}>
          <View style={styles.metaEntry}>
            <Text
              style={{ color: theme.colors.secondary }}
              type="header"
              size="xl"
            >
              {data?.recipe_yield}
            </Text>
            <Text
              type="body"
              size="l"
              style={{ color: theme.colors.secondary }}
            >
              Persons
            </Text>
          </View>
        </View>
        <View style={styles.ingredients}>
          <Text type="header" size="l">
            Ingredients
          </Text>
          {data?.ingredients?.map((ingredient, i) => (
            <Text key={i} type="body">
              • {ingredient}
            </Text>
          ))}
        </View>
        <View style={styles.instructions}>
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
    marginHorizontal: theme.spacing.m,
  },
  description: {
    marginBottom: theme.spacing.m,
    marginHorizontal: theme.spacing.m,
  },
  image: {
    width: SCREEN_WIDTH - theme.spacing.m * 2,
    aspectRatio: 1.7,
    borderRadius: 20,
    marginBottom: theme.spacing.m,
    marginHorizontal: theme.spacing.m,
  },
  recipeMeta: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.l,
    marginBottom: theme.spacing.m,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  metaEntry: {
    alignItems: "center",
  },
  ingredients: {
    marginBottom: theme.spacing.l,
    marginHorizontal: theme.spacing.m,
  },
  instructions: {
    marginBottom: theme.spacing.l,
    marginHorizontal: theme.spacing.m,
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
