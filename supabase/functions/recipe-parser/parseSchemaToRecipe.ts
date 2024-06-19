import type { Recipe as RecipeSchema } from "https://esm.sh/v128/schema-dts@1.1.2/dist/schema.js";
import { formatDuration, isValidURL } from "./utils.ts";

function getImages(image?: string | string[] | { url: string }): string[] {
  if (!image) return [];
  if (typeof image === "string") return [image];

  if (Array.isArray(image)) {
    return [...image];
  }

  return [image.url];
}

function getInstructions(instructions: any) {
  if (!instructions) return null;
  if (typeof instructions === "string") return [instructions];

  if (instructions[0].itemListElement) {
    return getInstructions(instructions[0].itemListElement);
  }

  return instructions?.map((instruction: any) => {
    if (typeof instruction === "string") return instruction;

    return instruction.text;
  });
}

function getIngredients(ingredients?: string[]) {
  if (!ingredients) return null;

  return ingredients.map((ingredient) => ({
    name: ingredient,
  }));
}

function getYield(yieldValue?: string | number | number[]) {
  if (!yieldValue) return null;

  if (typeof yieldValue === "string") return yieldValue;
  if (typeof yieldValue === "number") return yieldValue;

  return yieldValue[0];
}

function parseSchemaToRecipe(
  schema: Record<keyof RecipeSchema, any>,
  url: string
) {
  const ingredients = getIngredients(schema.recipeIngredient);
  const instructions = getInstructions(schema.recipeInstructions);
  const images = getImages(schema.image).filter(isValidURL);
  const recipeYield = getYield(schema.recipeYield);
  const totalTime = formatDuration(schema.totalTime);

  const recipe = {
    name: schema.name,
    description: schema.description,
    ingredients,
    instructions,
    images,
    recipe_yield: recipeYield,
    total_time: totalTime,
    source_url: url,
    // cook_time: schema.cookTime,
    // prep_time: schema.prepTime,
    // date_published: schema.datePublished,
    // date_modified: schema.dateModified,
  };

  return recipe;
}

export default parseSchemaToRecipe;
