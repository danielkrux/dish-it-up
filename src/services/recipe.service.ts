import { Recipe } from "../../supabase/functions/recipe-parser/types/Recipe";
import { supabase } from "../app/_layout";

export async function parseRecipe(url: string): Promise<Recipe | null> {
  const result = await supabase.functions.invoke<Recipe>("recipe-parser", {
    body: { url },
  });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function saveRecipe(recipe?: Recipe) {
  if (!recipe || recipe === undefined) {
    console.error("No recipe to save");
  }

  const result = await supabase.from("recipes").insert({
    name: recipe?.name ?? "",
    description: recipe?.description,
    ingredients: recipe?.ingredients,
    instructions: recipe?.instructions,
    image_url: recipe?.imageUrl,
  });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
}

export async function getRecipes() {
  const result = await supabase.from("recipes").select("*");

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function getRecipe(id: string) {
  const result = await supabase.from("recipes").select("*").eq("id", id);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data[0];
}
