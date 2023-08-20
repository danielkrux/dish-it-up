import { Recipe as RecipeSchema } from "https://esm.sh/v128/schema-dts@1.1.2/dist/schema.js";
// import { Recipe } from "../../../types/Recipe.ts";

const getImage = (image: string | string[]) => {
  if (typeof image === "string") return image;

  return (
    image.find((img) => img.includes(".jpg") || img.includes(".png")) ?? ""
  );
};

function getCategory(category: string | string[]) {
  let result = "";
  if (typeof category === "string") {
    result = category.toLowerCase();
  } else {
    result = category[0].toLowerCase();
  }

  if (result.includes("hoofdgerecht")) return "main";
  if (result.includes("bijgerecht")) return "side";
  if (result.includes("nagerecht")) return "dessert";
  if (result.includes("ontbijt")) return "breakfast";

  return result;
}

function getInstructions(instructions: any[]): string[] {
  if (instructions[0].itemListElement) {
    return getInstructions(instructions[0].itemListElement);
  }

  return instructions?.map((instruction) => {
    if (typeof instruction === "string") return instruction;

    return instruction.text;
  });
}

function parseSchemaToRecipe(schema: Record<keyof RecipeSchema, any>) {
  const instructions = getInstructions(schema.recipeInstructions);
  const image = getImage(schema.image);
  const category = getCategory(schema.recipeCategory);

  console.log(schema);

  const recipe = {
    name: schema.name,
    description: schema.description,
    ingredients: schema.recipeIngredient,
    instructions: instructions,
    image_url: image,
    // cook_time: schema.cookTime,
    // prep_time: schema.prepTime,
    // total_time: schema.totalTime,
    recipe_yield: schema.recipeYield?.[0],
    // date_published: schema.datePublished,
    // date_modified: schema.dateModified,
    category: category,
  };

  return recipe;
}

export default parseSchemaToRecipe;
