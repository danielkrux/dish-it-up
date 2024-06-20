import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback } from "react";
import { FormProvider } from "react-hook-form";
import { View } from "react-native";
import Button from "~/components/Button";

import IconButton from "~/components/IconButton";
import RecipeDetail from "~/features/recipe/components/RecipeDetail/RecipeDetail";
import RecipeForm from "~/features/recipe/components/RecipeForm";
import useRecipeForm from "~/features/recipe/components/RecipeForm/useRecipeForm";
import useFetchRecipe from "~/features/recipe/hooks/useFetchRecipe";
import useUpdateRecipe from "~/features/recipe/hooks/useUpdateRecipe";
import { parseIngredients } from "~/features/recipe/recipe.utils";
import { isTablet } from "~/theme";

export default function EditRecipe() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { data } = useFetchRecipe(Number(id));
  const { mutate, isLoading } = useUpdateRecipe({
    onSuccess: () => router.back(),
  });

  const form = useRecipeForm(data);
  const { handleSubmit } = form;

  const handleSave = useCallback(() => {
    handleSubmit((recipeInputs) => {
      return mutate({
        ...data,
        ...recipeInputs,
        ingredients: parseIngredients(recipeInputs.ingredients),
        instructions: recipeInputs.instructions.map((i) => i.value),
      });
    })();
  }, [data, mutate, handleSubmit]);

  const renderHeaderLeft = useCallback(
    () => (
      <IconButton
        onPress={() => router.back()}
        icon="ChevronLeft"
        size="medium"
      />
    ),
    [router]
  );

  const renderHeaderRight = useCallback(
    () => (
      <Button
        size="small"
        variant="secondary"
        loading={isLoading}
        onPress={handleSave}
        className="ml-auto"
      >
        Save
      </Button>
    ),
    [isLoading, handleSave]
  );

  if (!data) return null;

  const currentValues = isTablet ? form.watch() : null;

  return (
    <FormProvider {...form}>
      <Stack.Screen
        options={{
          title: "Edit Recipe",
          headerLeft: renderHeaderLeft,
          headerRight: renderHeaderRight,
        }}
      />
      <View className="flex flex-row h-[calc(100vh-64px)] overflow-scroll">
        <RecipeForm className="max-w-4xl" />
        {isTablet && (
          <RecipeDetail
            id={Number(id)}
            formData={{
              name: currentValues?.name,
              description: currentValues?.description,
              instructions: currentValues?.instructions.map((i) => i.value),
              recipe_yield: currentValues?.recipe_yield,
              total_time: currentValues?.total_time,
              images: currentValues?.images,
              ingredients: parseIngredients(
                currentValues?.ingredients.map((i) => i)
              ),
            }}
          />
        )}
      </View>
    </FormProvider>
  );
}
