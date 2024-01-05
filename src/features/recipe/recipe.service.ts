import { supabase } from "~/app/_layout";
import { getSession } from "../auth/auth.service";
import { Recipe, RecipeCreate, RecipeUpdate } from "./recipe.types";
import { parseIngredients } from "./recipe.utils";

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
  const { user } = await getSession();

  if (!recipe || recipe === undefined) {
    throw new Error("No recipe to save");
  }

  const { ingredients, ...recipeToSave } = recipe;

  const result = await supabase
    .from("recipes")
    .insert({ ...recipeToSave, user_id: user?.id })
    .select()
    .single();

  if (result.error) {
    throw new Error(result.error.message);
  }

  const ingredientsToSave = parseIngredients(ingredients);

  const ingredientSaveResult = await supabase
    .from("ingredients")
    .insert(ingredientsToSave);

  if (ingredientSaveResult.error) {
    await supabase.from("recipes").delete().eq("id", result.data?.id);
    throw new Error(ingredientSaveResult.error.message);
  }

  return result;
}

export async function updateRecipe(recipeInput?: RecipeUpdate) {
  console.log("hu");
  if (!recipeInput || recipeInput === undefined) {
    console.error("No recipe to save");
    throw new Error("No recipe to save");
  }

  const { categories, ingredients, ...recipe } = recipeInput;

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

  for (const ingredient of ingredients) {
    const exists = ingredient.id;

    if (recipe.id && ingredient.name) {
      if (!exists) {
        await supabase.from("ingredients").insert({
          ...ingredient,
          name: ingredient.name,
          recipe_id: recipe.id,
        });
      } else {
        await supabase
          .from("ingredients")
          .update(ingredient)
          .eq("id", ingredient.id);
      }
    }
  }

  for (const category of categories) {
    const exists = category.id;

    if (recipe.id && category.id && category.name) {
      if (!exists) {
        const { data } = await supabase
          .from("categories")
          .insert({ name: category.name })
          .select()
          .single();
        if (!data) throw new Error("Could not create category");
        await supabase
          .from("recipe_categories")
          .insert({ recipe_id: recipe.id, category_id: data.id });
      } else {
        await supabase
          .from("recipe_categories")
          .insert({ recipe_id: recipe.id, category_id: category.id });
      }
    }
  }

  const result = await supabase
    .from("recipes")
    .update(recipe)
    .eq("id", recipe.id)
    .select("*, categories(*), ingredients(*)")
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
    .select("*, categories(*), ingredients(*)")
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

export async function getRecipe(id?: number) {
  if (!id) throw new Error("No recipe id provided");

  const result = await supabase
    .from("recipes")
    .select("*, categories(*), ingredients(*)")
    .eq("id", id)
    .single();

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function getRecipeByIds(ids?: number[]) {
  if (!ids) throw new Error("No recipe ids provided");

  const result = await supabase
    .from("recipes")
    .select("*, categories(*), ingredients(*)")
    .in("id", ids);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function deleteRecipe(id?: number) {
  if (!id) throw new Error("No recipe id provided");
  const result = await supabase.from("recipes").delete().eq("id", id);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
}

export async function getCategories() {
  const result = await supabase.from("categories").select("id, name");
  const categoriesWithRecipeId = await supabase
    .from("recipe_categories")
    .select("category_id");
  const numberOfRecipesPerCategory: Record<string, number> | undefined =
    categoriesWithRecipeId.data?.reduce((acc, curr) => {
      return {
        // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
        ...acc,
        //@ts-ignore
        [curr.category_id]: acc[curr.category_id]
          ? //@ts-ignore
            acc[curr.category_id] + 1
          : 1,
      };
    }, {});

  const resultWithCount = result.data?.map((category) => ({
    ...category,
    numberOfRecipes: numberOfRecipesPerCategory?.[category.id] ?? 0,
  }));

  if (result.error) {
    throw new Error(result.error.message);
  }

  return (
    resultWithCount?.sort((a, b) => {
      if (a.numberOfRecipes > b.numberOfRecipes) {
        return -1;
      }
      if (a.numberOfRecipes < b.numberOfRecipes) {
        return 1;
      }
      return 0;
    }) ?? []
  );
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

export async function createCategory(name?: string) {
  if (!name) throw new Error("No category name provided");

  const result = await supabase.from("categories").insert({ name });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
}

export async function deleteCategory(id: number) {
  const result = await supabase.from("categories").delete().eq("id", id);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
}

export async function editCategory(id: number, name?: string | null) {
  if (!name) throw new Error("No category name provided");

  const result = await supabase
    .from("categories")
    .update({ name })
    .eq("id", id)
    .select("id, name");

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result;
}
