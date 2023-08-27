import { formatDuration } from "./utils.ts";
import { Recipe as RecipeSchema } from "https://esm.sh/v128/schema-dts@1.1.2/dist/schema.js";
// import { Recipe } from "../../../types/Recipe.ts";

function getImage(image?: string | string[]) {
  if (!image) return null;
  if (typeof image === "string") return image;

  return (
    image.find((img) => img.includes(".jpg") || img.includes(".png")) ?? ""
  );
}

function getCategory(category?: string | string[]) {
  let result = "";
  if (!category) return null;

  if (typeof category === "string") {
    result = category.toLowerCase();
  } else {
    result = category?.[0].toLowerCase();
  }

  if (result.includes("hoofdgerecht")) return "main";
  if (result.includes("bijgerecht")) return "side";
  if (result.includes("nagerecht")) return "dessert";
  if (result.includes("ontbijt")) return "breakfast";

  return result;
}

function getInstructions(instructions?: any[]) {
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

function getYield(yieldValue?: string | number | number[]) {
  if (!yieldValue) return null;

  if (typeof yieldValue === "string") return null;
  if (typeof yieldValue === "number") return yieldValue;

  return yieldValue[0];
}

function parseSchemaToRecipe(schema: Record<keyof RecipeSchema, any>) {
  const instructions = getInstructions(schema.recipeInstructions);
  const image = getImage(schema.image);
  const category = getCategory(schema.recipeCategory);
  const recipeYield = getYield(schema.recipeYield);
  const totalTime = formatDuration(schema.totalTime);

  const recipe = {
    name: schema.name,
    description: schema.description,
    ingredients: schema.recipeIngredient,
    instructions: instructions,
    image_url: image,
    category: category,
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
