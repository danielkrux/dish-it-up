import { decode } from "base64-arraybuffer";
import { Tables } from "supabase/database.types";
import { supabase } from "~/app/_layout";
import { TableUpdate } from "~/clients/supabase";
import { isTruthy } from "~/utils/typescript";
import { getSession } from "../auth/auth.service";
import { Recipe, RecipeCreate, RecipeUpdate } from "./recipe.types";
import { parseIngredients, splitImagesByLocalAndRemote } from "./recipe.utils";

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

async function uploadRecipeImages(
  recipeId: number | undefined,
  images: RecipeCreate["images"] | RecipeUpdate["images"]
) {
  const BUCKET_NAME = "recipe-images";
  if (!images) return [];

  const uploadPromises = [];

  for (let i = 0; i < images.length; i++) {
    const element = images[i];
    const promise = supabase.storage
      .from(BUCKET_NAME)
      .upload(`${recipeId}/${i}`, decode(element), {
        contentType: "image/png",
      });
    uploadPromises.push(promise);
  }

  const promiseResult = await Promise.all(uploadPromises);
  const publicUrls = promiseResult
    .map(({ data }) => {
      if (!data) return null;
      return supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path).data
        .publicUrl;
    })
    .filter(isTruthy);

  return publicUrls;
}

export async function createRecipe(recipe?: RecipeCreate) {
  const { user } = await getSession();

  if (!recipe || recipe === undefined) {
    throw new Error("No recipe to save");
  }

  const { ingredients, categories, ...recipeToSave } = recipe;

  const result = await supabase
    .from("recipes")
    .insert({ ...recipeToSave, user_id: user?.id })
    .select("id")
    .single();

  if (result.error) {
    throw new Error(result.error.message);
  }

  if (result.data) {
    try {
      const { remoteImages, localImages } = splitImagesByLocalAndRemote(
        recipe.images
      );
      const newImages = await uploadRecipeImages(result.data.id, localImages);
      await supabase
        .from("recipes")
        .update({
          images: [...remoteImages, ...newImages],
        })
        .eq("id", result.data.id);
      await updateRecipeCategories(result.data.id, recipe.categories, false);
    } catch (error) {
      console.error(error);
    }
  }

  const ingredientsToSave = parseIngredients(
    ingredients.map((i) => ({ ...i, recipe_id: result.data?.id }))
  );

  const ingredientSaveResult = await supabase
    .from("ingredients")
    .insert(ingredientsToSave);

  if (ingredientSaveResult.error) {
    await supabase.from("recipes").delete().eq("id", result.data?.id);
    throw new Error(ingredientSaveResult.error.message);
  }

  return result;
}

export async function updateRecipe(recipeInput: RecipeUpdate) {
  const { categories, ingredients, ...recipe } = recipeInput;

  await updateRecipeCategories(recipe.id, categories);

  if (recipe.images) {
    const { localImages, remoteImages } = splitImagesByLocalAndRemote(
      recipe.images
    );
    const newImages = await uploadRecipeImages(recipeInput.id, localImages);
    recipe.images = [...remoteImages, ...newImages];
  }

  if (ingredients) {
    await supabase.from("ingredients").upsert(
      ingredients.map((i) => ({
        ...i,
        name: i.name ?? "",
        recipe_id: recipe.id,
      }))
    );
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

export async function getRecipes(
  searchQuery?: string,
  orderBy: keyof Tables<"recipes"> = "created_at"
) {
  let result = null;

  const baseQuery = supabase
    .from("recipes")
    .select("*, categories(*), ingredients(*)")
    .order(orderBy, { ascending: false });

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

export async function getLastMadeRecipes() {
  const result = await supabase
    .from("recipes")
    .select("id, name, images, last_cooked")
    .not("last_cooked", "is", "NULL")
    .order("last_cooked", { ascending: false })
    .limit(5);

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

export async function updateRecipeCategories(
  recipeId?: number,
  categories: TableUpdate<"categories">[] = [],
  shouldDelete = true
) {
  if (!categories) return;

  if (shouldDelete) {
    const currentRecipeCategories = await getRecipeCategories(recipeId);
    const currentRecipeCategoriesIds = currentRecipeCategories?.categories?.map(
      (category) => category.id
    );
    const categoriesToDelete = currentRecipeCategoriesIds?.filter(
      (categoryId) =>
        !categories?.find((category) => category.id === categoryId)
    );
    await supabase
      .from("recipe_categories")
      .delete()
      .eq("recipe_id", recipeId)
      .in("category_id", categoriesToDelete);
  }

  for (const category of categories || []) {
    const exists = category.id;

    if (!recipeId || !category.name) return;

    if (!exists) {
      const { data } = await supabase
        .from("categories")
        .insert({ name: category.name })
        .select()
        .single();
      if (!data) throw new Error("Could not create category");
      await supabase
        .from("recipe_categories")
        .insert({ recipe_id: recipeId, category_id: data.id });
    } else {
      if (!category.id) throw new Error("No category id provided");
      await supabase
        .from("recipe_categories")
        .insert({ recipe_id: recipeId, category_id: category.id });
    }
  }
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
