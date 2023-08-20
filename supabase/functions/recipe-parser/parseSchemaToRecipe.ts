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

  if (result === "hoofdgerecht") return "main";
  if (result === "bijgerecht") return "side";
  if (result === "nagerecht") return "dessert";
  if (result === "ontbijt") return "breakfast";
  if (result === "lunch") return "lunch";

  return result;
}

function parseSchemaToRecipe(schema: Record<keyof RecipeSchema, any>) {
  const instructions = schema.recipeInstructions?.map((instruction: any) => {
    if (typeof instruction === "string") return instruction;

    return instruction.text;
  });

  const image = getImage(schema.image);
  const category = getCategory(schema.recipeCategory);

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
