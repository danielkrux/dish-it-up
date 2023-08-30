import { supabase } from "../../app/_layout";
import { Recipe, RecipeInputs, RecipeUpdate } from "./recipe.types";

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

export async function createRecipe(recipe?: RecipeInputs) {
  if (!recipe || recipe === undefined) {
    console.error("No recipe to save");
    throw new Error("No recipe to save");
  }

  const result = await supabase.from("recipe").insert(recipe);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
}

export async function updateRecipe(recipeInput?: RecipeUpdate) {
  if (!recipeInput || recipeInput === undefined) {
    console.error("No recipe to save");
    throw new Error("No recipe to save");
  }

  // const allCategories = await supabase.from("category").select("*");
  // // insert new category if category doesnt exist
  // await supabase
  //   .from("category")
  //   .insert(
  //     recipeInput.categories
  //       .filter(
  //         (categoryId) =>
  //           !allCategories.data?.find((category) => category.id === categoryId)
  //       )
  //       .map((categoryId) => ({ id: categoryId, name: categoryId }))
  //   );

  const { categories, ...recipe } = recipeInput;

  const result = await supabase
    .from("recipe")
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

  const baseQuery = supabase
    .from("recipe")
    .select("name, id, image_url, created_at, category(id, name)")
    .order("created_at", { ascending: false });

  if (searchQuery) {
    result = await baseQuery.ilike("name", `%${searchQuery}%`);
  } else {
    result = await baseQuery;
  }

  if (result.error) {
    throw new Error(result.error.message);
  }

  console.log(result.data);

  return result.data;
}

export async function getRecipe(id: string) {
  const result = await supabase
    .from("recipe")
    .select("*")
    .eq("id", id)
    .single();

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function deleteRecipe(id: string) {
  const result = await supabase.from("recipe").delete().eq("id", id);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
}

export async function getRecipeCategories(recipeId?: string) {
  // if (!recipeId) return [];

  // const linkResult = await supabase
  //   .from("recipe_category")
  //   .select("*")
  //   .eq("recipe_id", recipeId);

  // if (linkResult.error) {
  //   throw new Error(linkResult.error?.message);
  // }

  // const result = await supabase.from("category").select("*")

  // if (result.error) {
  //   throw new Error(result.error?.message);
  // }

  // return result.data;
}

export async function createCategory(name: string) {
  const result = await supabase.from("category").insert({ name });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
}
