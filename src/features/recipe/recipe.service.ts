import { Recipe } from "../../../types/Recipe";
import { supabase } from "../../app/_layout";
import { RecipeInputs } from "./types";

export async function parseRecipe(url: string): Promise<Recipe | null> {
  const result = await supabase.functions.invoke<Recipe>(
    `recipe-parser?url=${encodeURI(url)}`,
    { method: "GET" }
  );

  if (result.error) {
    console.error(result.error.message);
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function getRecipeCategories() {
  const result = await supabase.from("recipes").select("category");

  if (result.error) {
    throw new Error(result.error.message);
  }

  const allCategories = result.data.flatMap((f) =>
    f.category ? [f.category] : []
  );
  return [...new Set(allCategories)];
}

export async function createRecipe(recipe?: RecipeInputs) {
  if (!recipe || recipe === undefined) {
    console.error("No recipe to save");
    throw new Error("No recipe to save");
  }

  const result = await supabase.from("recipes").insert(recipe);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
}

export async function updateRecipe(recipe?: Recipe) {
  if (!recipe || recipe === undefined) {
    console.error("No recipe to save");
    throw new Error("No recipe to save");
  }

  const result = await supabase
    .from("recipes")
    .update(recipe)
    .eq("id", recipe.id)
    .select()
    .single();

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
}

export async function getRecipes(searchQuery?: string) {
  let result = null;

  const { data, error } = await supabase.rpc("filter_recipes", {
    query: searchQuery || "",
  });

  if (searchQuery) {
    result = await supabase
      .from("recipes")
      .select("*")
      .order("created_at", { ascending: false })
      .ilike("name", `%${searchQuery}%`);
  } else {
    result = await supabase
      .from("recipes")
      .select("*")
      .order("created_at", { ascending: false });
  }

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function getRecipe(id: string) {
  const result = await supabase
    .from("recipes")
    .select("*")
    .eq("id", id)
    .single();

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function deleteRecipe(id: string) {
  const result = await supabase.from("recipes").delete().eq("id", id);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
}
