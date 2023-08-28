import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

import { Recipe } from "../../../../types/Recipe";
import Button from "../../../components/Button";
import { ChipInput } from "../../../components/Inputs/ChipInput";
import {
  ControlledArrayInput,
  ControlledInput,
} from "../../../components/Inputs/ControlledInputs";
import theme from "../../../theme";
import { getRecipeCategories } from "../recipe.service";
import { RecipeInputs } from "../recipe.types";
import { StyleSheet, View } from "react-native";

const emtpyRecipe: RecipeInputs = {
  name: "",
  description: "",
  recipe_yield: "",
  categories: [""],
  ingredients: [""],
  instructions: [""],
  total_time: "",
};

function RecipeForm({
  initialRecipe,
  onSubmit,
}: {
  initialRecipe?: Recipe;
  onSubmit: (data: RecipeInputs) => void;
}) {
  const { data } = useQuery(["recipes", "categories"], getRecipeCategories, {
    select: (data) =>
      data?.map((category) => ({
        label: category.name,
        value: category.id,
      })),
  });

  const getDefaultValues = useCallback(() => {
    if (!initialRecipe) return emtpyRecipe;

    return {
      name: initialRecipe.name || "",
      description: initialRecipe.description || "",
      categories:
        initialRecipe.categories?.map((category) => category.id) || [],
      recipe_yield: initialRecipe.recipe_yield || "",
      total_time: initialRecipe.total_time || "",
      ingredients: initialRecipe.ingredients || [],
      instructions: initialRecipe.instructions || [],
    };
  }, [initialRecipe]);

  const { control, handleSubmit, setValue, getValues, watch } =
    useForm<RecipeInputs>({
      defaultValues: getDefaultValues(),
    });

  // console.log(watch())

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
        data={data}
        onAdd={(item) => {
          setValue("categories", [...getValues("categories"), item.value]);
        }}
        onRemove={(item) => {
          setValue(
            "categories",
            getValues("categories").filter((i) => i !== item.value)
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
        values={watch("ingredients")}
        onAdd={() => setValue("ingredients", [...getValues().ingredients, ""])}
        onRemove={(index) => {
          const ingredients = getValues().ingredients;
          ingredients.splice(index, 1);
          setValue("ingredients", ingredients);
        }}
      />
      <ControlledArrayInput
        label="Instructions"
        name="instructions"
        control={control}
        values={watch("instructions")}
        onAdd={() =>
          setValue("instructions", [...getValues().instructions, ""])
        }
        onRemove={(index) => {
          const instructions = getValues().instructions;
          instructions.splice(index, 1);
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
