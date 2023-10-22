import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

import Button from "../../../components/Button";
import { ChipInput } from "../../../components/Inputs/ChipInput";
import {
  ControlledArrayInput,
  ControlledInput,
} from "../../../components/Inputs/ControlledInputs";
import theme from "../../../theme";
import { getCategories, getRecipeCategories } from "../recipe.service";
import { Recipe, RecipeUpdate } from "../recipe.types";
import { StyleSheet, View } from "react-native";

const emtpyRecipe: RecipeUpdate = {
  name: "",
  description: "",
  recipe_yield: "",
  ingredients: [""],
  instructions: [""],
  total_time: "",
  categories: [],
};

function RecipeForm({
  initialRecipe,
  onSubmit,
}: {
  initialRecipe?: Recipe;
  onSubmit: (data: RecipeUpdate) => void;
}) {
  const recipeCategories = useQuery(
    ["recipes", { id: initialRecipe?.id }, "categories"],
    () => getRecipeCategories(initialRecipe?.id),
    {
      enabled: !!initialRecipe,
      select: (data) => data.categories.map((c) => String(c.id)),
    }
  );

  const categoriesQuery = useQuery(["categories"], () => getCategories());

  const getDefaultValues = useCallback(() => {
    if (!initialRecipe) return emtpyRecipe;

    return {
      name: initialRecipe.name || "",
      description: initialRecipe.description || "",
      recipe_yield: initialRecipe.recipe_yield || "",
      total_time: initialRecipe.total_time || "",
      ingredients: initialRecipe.ingredients || [],
      instructions: initialRecipe.instructions || [],
      categories: initialRecipe.categories || [],
    };
  }, [initialRecipe]);

  const { control, handleSubmit, setValue, getValues, watch } =
    useForm<RecipeUpdate>({
      defaultValues: getDefaultValues(),
    });

  return (
    <View style={styles.container}>
      <ControlledInput
        label="Name"
        name="name"
        control={control}
        returnKeyType="next"
      />
      <ControlledInput
        label="Description"
        name="description"
        control={control}
        returnKeyType="next"
        numberOfLines={2}
        multiline
        style={{ minHeight: 100 }}
      />
      <ControlledInput
        label="Yields"
        name="recipe_yield"
        control={control}
        returnKeyType="next"
      />
      <ChipInput
        label="Categories"
        value={watch("categories").map((c) => ({
          value: String(c.id) ?? "",
          label: c.name ?? "",
        }))}
        data={categoriesQuery.data?.map((c) => ({
          value: String(c.id) ?? "",
          label: c.name ?? "",
        }))}
        onAdd={(item) => {
          setValue("categories", [
            ...getValues("categories"),
            { name: item.label, id: Number(item.value) },
          ]);
        }}
        onRemove={(item) => {
          setValue(
            "categories",
            getValues("categories").filter((i) => i.id !== Number(item.value))
          );
        }}
      />
      <ControlledInput
        label="Total time"
        name="total_time"
        control={control}
        returnKeyType="next"
      />
      <ControlledArrayInput
        label="Ingredients"
        name="ingredients"
        control={control}
        returnKeyType="next"
        values={watch("ingredients") ?? []}
        onAdd={() =>
          setValue("ingredients", [...(getValues().ingredients ?? []), ""])
        }
        onRemove={(index) => {
          const ingredients = getValues().ingredients;
          ingredients?.splice(index, 1);
          setValue("ingredients", ingredients);
        }}
      />
      <ControlledArrayInput
        label="Instructions"
        name="instructions"
        control={control}
        values={watch("instructions") ?? []}
        onAdd={() =>
          setValue("instructions", [...(getValues().instructions ?? []), ""])
        }
        onRemove={(index) => {
          const instructions = getValues().instructions;
          instructions?.splice(index, 1);
          setValue("instructions", instructions);
        }}
      />
      <Button size="large" onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </View>
  );
}

export default RecipeForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: theme.spacing.m,
  },
});
