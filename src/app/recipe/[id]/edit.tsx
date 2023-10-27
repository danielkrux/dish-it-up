import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback } from "react";
import { ScrollView } from "react-native";

import IconButton from "../../../components/IconButton";
import RecipeForm from "../../../features/recipe/components/RecipeForm";
import useFetchRecipe from "../../../features/recipe/hooks/useFetchRecipe";
import useUpdateRecipe from "../../../features/recipe/hooks/useUpdateRecipe";
import useScrollingFormAvoidKeyBoard from "../../../hooks/useScrollingFormAvoidKeyboard";
import theme from "../../../theme";

export default function EditRecipe() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { data } = useFetchRecipe(Number(id));
  const { mutate } = useUpdateRecipe({
    onSuccess: () => router.back(),
  });

  useScrollingFormAvoidKeyBoard();

  const renderHeaderLeft = useCallback(
    () => (
      <IconButton
        onPress={() => router.back()}
        icon="chevron-left"
        size="medium"
      />
    ),
    [router]
  );

  if (!data) return null;

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ padding: theme.spacing.m }}
    >
      <Stack.Screen
        options={{
          title: "Edit Recipe",
          headerLeft: renderHeaderLeft,
        }}
      />
      <RecipeForm
        initialRecipe={data}
        onSubmit={(recipeInputs) => {
          return mutate({ ...data, ...recipeInputs });
        }}
      />
    </ScrollView>
  );
}
