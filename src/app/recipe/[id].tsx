import { Text, View } from "react-native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Stack as RouterStack, useLocalSearchParams } from "expo-router";

import { getRecipe } from "../../services/recipe.service";
import type { Recipe } from "../../../types/Recipe";

export default function Recipe() {
  const { id } = useLocalSearchParams();
  const queryClient = useQueryClient();
  const { data } = useQuery(["recipes", id], () => getRecipe(id as string), {
    initialData: () =>
      queryClient.getQueryData<Recipe[]>(["recipes"])?.find((r) => r.id === id),
  });

  return (
    <View>
      <RouterStack.Screen options={{ title: data?.name ?? "" }} />
      <Text>{data?.name}</Text>
    </View>
  );
}
