import { supabase } from "../../app/_layout";
import { GroceryListItemUpdate } from "./groceryList.types";

export async function fetchGroceryList() {
  const result = await supabase
    .from("grocery_list")
    .select("*")
    .order("completed_at", { ascending: true, nullsFirst: true })
    .order("id", { ascending: true });

  if (result.error) {
    throw new Error(result?.error.message);
  }

  return result.data;
}

export async function createGroceryList(items: string[]) {
  const itemsToInsert = items.map((item) => ({ name: item }));

  const result = await supabase.from("grocery_list").insert(itemsToInsert);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function updateGroceryListItem(
  groceryItem: GroceryListItemUpdate
) {
  const result = await supabase
    .from("grocery_list")
    .update(groceryItem)
    .eq("id", groceryItem.id)
    .select();

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function deleteGroceryListItem(ids: number[]) {
  const result = await supabase.from("grocery_list").delete().in("id", ids);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
}
