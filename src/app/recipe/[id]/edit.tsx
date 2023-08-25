import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback } from "react";
import { ScrollView } from "react-native";

import RecipeForm from "../../../features/recipe/components/RecipeForm";
import theme from "../../../theme";
import IconButton from "../../../components/IconButton";
import useFetchRecipe from "../../../features/recipe/hooks/useFetchRecipe";
import useScrollingFormAvoidKeyBoard from "../../../hooks/useScrollingFormAvoidKeyboard";
import useUpdateRecipe from "../../../features/recipe/hooks/useUpdateRecipe";

export default function EditRecipe() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { data } = useFetchRecipe(id as string);
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
        onSubmit={(recipeInputs) => mutate({ ...data, ...recipeInputs })}
      />
    </ScrollView>
  );
}
