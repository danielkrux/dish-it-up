import { Recipe as RecipeSchema } from "https://esm.sh/v128/schema-dts@1.1.2/dist/schema.js";
import { formatDuration } from "./utils.ts";

function getImage(image?: string | string[]) {
  if (!image) return null;
  if (typeof image === "string") return image;

  return (
    image.find((img) => img.includes(".jpg") || img.includes(".png")) ?? ""
  );
}

function getInstructions(instructions?: string[]) {
  if (!instructions) return null;
  if (instructions[0].itemListElement) {
    return getInstructions(instructions[0].itemListElement);
  }

  if (typeof instructions === "string") return instructions;

  return instructions?.map((instruction) => {
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

  if (typeof yieldValue === "string") return null;
  if (typeof yieldValue === "number") return yieldValue;

  return yieldValue[0];
}

function parseSchemaToRecipe(schema: Record<keyof RecipeSchema, any>) {
  const ingredients = getIngredients(schema.recipeIngredient);
  const instructions = getInstructions(schema.recipeInstructions);
  const image = getImage(schema.image);
  const recipeYield = getYield(schema.recipeYield);
  const totalTime = formatDuration(schema.totalTime);

  const recipe = {
    name: schema.name,
    description: schema.description,
    ingredients: ingredients,
    instructions: instructions,
    image_url: image,
    recipe_yield: recipeYield,
    total_time: totalTime,
    // cook_time: schema.cookTime,
    // prep_time: schema.prepTime,
    // date_published: schema.datePublished,
    // date_modified: schema.dateModified,
  };

  return recipe;
}

export default parseSchemaToRecipe;
