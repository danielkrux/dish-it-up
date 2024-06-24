import { supabase } from "~/app/_layout";
import { getSession } from "../auth/auth.service";
import { getRecipe } from "../recipe/recipe.service";

export async function getRecipeShare(id: number) {
  const { data, error } = await supabase
    .from("shares")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error getting recipe share", error);
    throw error;
  }

  return data;
}

export async function createRecipeShare(recipeId: number) {
  const recipe = await getRecipe(recipeId, false);
  const { user } = await getSession();

  const { data, error } = await supabase
    .from("shares")
    .insert({
      full_recipe: { ...recipe, userId: null, rating: null, last_cooked: null },
      user_id: user.id,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Error sharing recipe", error);
    throw error;
  }

  return data.id;
}
