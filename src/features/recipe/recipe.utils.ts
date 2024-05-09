import { IngredientCreate, IngredientUpdate } from "./recipe.types";

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
    if (typeof ingredient.id === "undefined") {
      return {
        name: ingredient.name ?? "",
      };
    }

    if (ingredient.name?.match(/^\d/) || ingredient.name?.startsWith("½")) {
      const bracketsRegex = new RegExp(/\(([^)]+)\)/);
      const brackets = ingredient.name?.match(bracketsRegex);
      const [amount, unit, ...name] = ingredient.name
        .replace(bracketsRegex, "")
        .trim()
        .split(" ");

      if (!name.length) {
        return {
          ...ingredient,
          amount,
          name: `${unit} ${brackets?.[0] ?? ""}`.trim(),
          unit: null,
        };
      }

      return {
        ...ingredient,
        name: `${name.join(" ")} ${brackets?.[0] ?? ""}`.trim(),
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

export function splitImagesByLocalAndRemote(
  images: string[] | null | undefined
) {
  if (!images) return { localImages: [], remoteImages: [] };

  const localImages = images.filter((image) => !image?.startsWith("https"));
  const remoteImages = images.filter((image) => image?.startsWith("https"));

  return { localImages, remoteImages };
}
