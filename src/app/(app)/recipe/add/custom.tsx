import { Stack, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { FormProvider } from "react-hook-form";
import { View } from "react-native";

import Button from "~/components/Button";
import RecipeForm from "~/features/recipe/components/RecipeForm";
import useRecipeForm from "~/features/recipe/components/RecipeForm/useRecipeForm";
import useCreateRecipe from "~/features/recipe/hooks/useCreateRecipe";
import { parseIngredients } from "~/features/recipe/recipe.utils";

function AddRecipe() {
  const params = useLocalSearchParams<{
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
  }>();

  const form = useRecipeForm({
    ...params,
    ingredients: params.ingredients?.length
      ? JSON.parse(params.ingredients)
      : [{ name: "" }],
    instructions: params.instructions?.length
      ? JSON.parse(params.instructions)
      : [""],
  });

  const { handleSubmit } = form;

  const { mutate, isLoading } = useCreateRecipe();

  function handleSave() {
    handleSubmit(async (values) => {
      const parsedIngredients = parseIngredients(values.ingredients);

      return mutate({
        ...values,
        categories: values.categories ?? [],
        ingredients: parsedIngredients,
        instructions: values.instructions.map((i) => i.value),
      });
    })();
  }

  const renderHeaderRight = useCallback(
    () => (
      <Button
        loading={isLoading}
        size="small"
        variant="secondary"
        onPress={handleSave}
      >
        Save
      </Button>
    ),
    [isLoading]
  );

  return (
    <FormProvider {...form}>
      <Stack.Screen
        options={{
          title: "Create Recipe",
          headerRight: renderHeaderRight,
          headerBackTitleVisible: false,
        }}
      />
      <View className="mt-4">
        <RecipeForm />
      </View>
    </FormProvider>
  );
}

export default AddRecipe;
