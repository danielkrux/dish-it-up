import { Ingredient, IngredientCreate, IngredientUpdate } from "./recipe.types";

export function findRecipeYieldAmount(recipeYield: string) {
  const numberRegex = new RegExp(/\d+/);
  const number = recipeYield.match(numberRegex);
  return number ? Number(number[0]) : null;
}

export function parseIngredientAmount(amount: string | null) {
  if (!amount) return null;
  if (!Number.isNaN(Number(amount))) return Number(amount);
  if (amount === "1/2" || amount === "½") return 0.5;
}

export function parseIngredients(
  _ingredients?: IngredientUpdate[] | IngredientCreate[]
): IngredientCreate[] {
  if (!_ingredients) return [];

  const ingredients = _ingredients.map((ingredient) => {
    if (ingredient.name?.match(/^\d/) || ingredient.name?.startsWith("½")) {
      const [amount, unit, ...name] = ingredient.name.split(" ");
      if (!name.length) {
        return {
          ...ingredient,
          amount,
          name: unit,
          unit: null,
        };
      }

      return {
        ...ingredient,
        name: name.join(" "),
        amount,
        unit,
      };
    }
    return {
      ...ingredient,
      name: ingredient.name ?? "",
    };
  });

  return ingredients;
}
