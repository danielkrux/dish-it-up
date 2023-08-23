import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { useCallback } from "react";
import { AvoidSoftInput } from "react-native-avoid-softinput";

import { getRecipe } from "../../features/recipe/recipe.service";
import RecipeForm from "../../features/recipe/components/RecipeForm";
import { Recipe } from "../../../types/Recipe";
import { ScrollView } from "react-native";
import theme from "../../theme";
import IconButton from "../../components/IconButton";

export default function EditRecipe() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useQuery(["recipes", id], () => getRecipe(id as string), {
    initialData: () =>
      queryClient.getQueryData<Recipe[]>(["recipes"])?.find((r) => r.id === id),
  });

  const onFocusEffect = useCallback(() => {
    AvoidSoftInput.setShouldMimicIOSBehavior(true);
    AvoidSoftInput.setEnabled(true);
    return () => {
      AvoidSoftInput.setEnabled(false);
      AvoidSoftInput.setShouldMimicIOSBehavior(false);
    };
  }, []);

  useFocusEffect(onFocusEffect);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ padding: theme.spacing.m }}
    >
      <Stack.Screen
        options={{
          title: "Edit Recipe",
          headerLeft: () => (
            <IconButton
              onPress={() => router.back()}
              icon="chevron-left"
              size="medium"
            />
          ),
        }}
      />
      <RecipeForm initialRecipe={data} />
    </ScrollView>
  );
}
