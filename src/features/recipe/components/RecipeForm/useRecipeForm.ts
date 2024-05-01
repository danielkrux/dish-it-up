import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Recipe, RecipeUpdate } from "../../recipe.types";
import { RecipeUpdateForm } from "./types";

const emtpyRecipe: RecipeUpdateForm = {
  name: "",
  description: "",
  images: [],
  recipe_yield: "",
  ingredients: [{ name: "" }],
  instructions: [{ value: "" }],
  total_time: "",
  categories: [],
};

function useRecipeForm(initialRecipe?: RecipeUpdate) {
  const getDefaultValues = useCallback((): RecipeUpdateForm => {
    if (!initialRecipe) return emtpyRecipe;

    const ingredients =
      initialRecipe.ingredients?.map((i) => {
        const amount = i.amount ?? "";
        const unit = i.unit ?? "";

        return { name: `${amount} ${unit} ${i.name}`.trim(), id: i.id };
      }) || [];

    const instructions =
      initialRecipe.instructions?.map((i) => ({ value: i })) || [];

    return {
      name: initialRecipe.name || "",
      description: initialRecipe.description || "",
      images: initialRecipe.images || [],
      recipe_yield: initialRecipe.recipe_yield || "",
      total_time: initialRecipe.total_time || "",
      categories: initialRecipe.categories || [],
      ingredients,
      instructions,
    };
  }, [initialRecipe]);

  const form = useForm<RecipeUpdateForm>({
    defaultValues: getDefaultValues(),
  });

  return form;
}

export default useRecipeForm;
