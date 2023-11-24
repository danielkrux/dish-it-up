import { TableCreate, TableUpdate, Tables } from "../../clients/supabase";

export type GroceryListItemCreate = TableCreate<"grocery_list">;
export type GroceryListItemUpdate = TableUpdate<"grocery_list">;
export type GroceryListItem = Tables<"grocery_list">;
