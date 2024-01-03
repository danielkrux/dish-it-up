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
