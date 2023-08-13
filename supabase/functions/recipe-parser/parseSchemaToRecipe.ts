import { Recipe as RecipeSchema } from "https://esm.sh/v128/schema-dts@1.1.2/dist/schema.js";
import { Recipe } from "./types/Recipe.ts";

const getImage = (image: string | string[]) => {
  if (typeof image === "string") return image;

  return (
    image.find((img) => img.includes(".jpg") || img.includes(".png")) ?? ""
  );
};

function parseSchemaToRecipe(schema: Record<keyof RecipeSchema, any>): Recipe {
  const instructions = schema.recipeInstructions?.map((instruction: any) => {
    if (typeof instruction === "string") return instruction;

    return instruction.text;
  });

  const image = getImage(schema.image);

  const recipe: Recipe = {
    name: schema.name,
    description: schema.description,
    ingredients: schema.recipeIngredient,
    instructions: instructions,
    imageUrl: image,
  };

  return recipe;
}

export default parseSchemaToRecipe;
