import { supabase } from "../../app/_layout";
import { Recipe, RecipeCreate, RecipeUpdate } from "./recipe.types";

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

export async function createRecipe(recipe?: RecipeCreate) {
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

export async function updateRecipe(recipeInput?: RecipeUpdate) {
  if (!recipeInput || recipeInput === undefined) {
    console.error("No recipe to save");
    throw new Error("No recipe to save");
  }

  const { categories, ...recipe } = recipeInput;

  // remove categories from database if they are not in the recipe anymore
  const currentRecipeCategories = await getRecipeCategories(recipe.id);
  const currentRecipeCategoriesIds = currentRecipeCategories?.categories?.map(
    (category) => category.id
  );
  const categoriesToDelete = currentRecipeCategoriesIds?.filter(
    (categoryId) => !categories.find((category) => category.id === categoryId)
  );
  await supabase
    .from("recipe_categories")
    .delete()
    .eq("recipe_id", recipeInput.id)
    .in("category_id", categoriesToDelete);

  categories.forEach(async (category) => {
    const exists = await supabase
      .from("categories")
      .select("id")
      .eq("id", category.id)
      .single();

    if (recipe.id && category.id && category.name) {
      if (!exists.data) {
        await supabase.from("categories").insert({ name: category.name });
        await supabase
          .from("recipe_categories")
          .insert({ recipe_id: recipe.id, category_id: category.id });
      } else {
        await supabase
          .from("recipe_categories")
          .insert({ recipe_id: recipe.id, category_id: category.id });
      }
    }
  });

  const result = await supabase
    .from("recipes")
    .update(recipe)
    .eq("id", recipe.id)
    .select("*, categories(*)")
    .single();

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
}

export async function getRecipes(searchQuery?: string) {
  let result = null;

  const baseQuery = supabase
    .from("recipes")
    .select("*, categories(*)")
    .order("created_at", { ascending: false });

  if (searchQuery) {
    result = await baseQuery.ilike("name", `%${searchQuery}%`);
  } else {
    result = await baseQuery;
  }

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function getRecipe(id: number) {
  const result = await supabase
    .from("recipes")
    .select("*, categories(*)")
    .eq("id", id)
    .single();

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function deleteRecipe(id: number) {
  const result = await supabase.from("recipes").delete().eq("id", id);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
}

export async function getCategories() {
  const result = await supabase.from("categories").select("id, name");

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function getRecipeCategories(recipeId?: number) {
  if (!recipeId) throw new Error("No recipe id provided");

  const result = await supabase
    .from("recipes")
    .select("categories(id, name)")
    .eq("id", recipeId)
    .single();

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function createCategory(name: string) {
  const result = await supabase.from("categories").insert({ name });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
}
