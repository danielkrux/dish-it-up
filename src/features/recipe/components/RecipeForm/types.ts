import { RecipeUpdate } from "../../recipe.types";

export type RecipeUpdateForm = Omit<
  RecipeUpdate,
  "ingredients" | "instructions"
> & {
  ingredients: { name: string; id?: number; order: number }[];
  instructions: { value: string }[];
};
