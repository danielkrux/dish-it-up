import { Ingredient, Recipe } from "../recipe/recipe.types";

const parenthesisRegex = new RegExp(/\([^)]*\)/, "g");
const dotsAndCommasRegex = new RegExp(/[.,]/, "g");

export function findMatchingIngredient(
  word: string,
  ingredients?: Recipe["ingredients"]
) {
  if (!ingredients) return undefined;

  const ingredient = ingredients.find((ingredient) => {
    const ingredientName = ingredient.name
      .toLowerCase()
      .replace(parenthesisRegex, "")
      .replace(dotsAndCommasRegex, "")
      .trim();
    const wordSanitized = word
      .toLowerCase()
      .replace(parenthesisRegex, "")
      .replace(dotsAndCommasRegex, "")
      .trim();

    return ingredientName === wordSanitized || wordSanitized === ingredientName;
  });

  return ingredient;
}
