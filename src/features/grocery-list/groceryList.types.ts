import { TableCreate, TableUpdate, Tables } from "../../clients/supabase";

export type GroceryListCreate = TableCreate<"grocery_list">;
export type GroceryListUpdate = TableUpdate<"grocery_list">;
export type GroceryList = Tables<"grocery_list">;
