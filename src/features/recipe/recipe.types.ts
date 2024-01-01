import { TableCreate, TableUpdate, Tables } from "~/clients/supabase";

export type RecipeCreate = TableCreate<"recipes"> & {
  categories: TableCreate<"categories">[];
  ingredients: TableCreate<"ingredients">[];
};
export type RecipeUpdate = TableUpdate<"recipes"> & {
  categories: TableUpdate<"categories">[];
  ingredients: TableUpdate<"ingredients">[];
};
export type Recipe = Tables<"recipes"> & {
  categories: Tables<"categories">[];
  ingredients: Tables<"ingredients">[];
};

export type Ingredient = Tables<"ingredients">;
export type IngredientCreate = TableCreate<"ingredients">;
export type IngredientUpdate = TableUpdate<"ingredients">;
