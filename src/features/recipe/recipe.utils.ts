export function findRecipeYieldAmount(recipeYield: string) {
  const numberRegex = new RegExp(/\d+/);
  const number = recipeYield.match(numberRegex);
  return number ? Number(number[0]) : null;
}
