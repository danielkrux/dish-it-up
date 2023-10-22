import { TableCreate, TableUpdate, Tables } from "../../clients/supabase";

export type RecipeCreate = TableCreate<"recipes"> & {
  categories: TableCreate<"categories">[];
};
export type RecipeUpdate = TableUpdate<"recipes"> & {
  categories: TableUpdate<"categories">[];
};
export type Recipe = Tables<"recipes"> & {
  categories: Tables<"categories">[];
};
