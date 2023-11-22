import { supabase } from "../../app/_layout";

export async function fetchGroceryList() {
  const result = await supabase.from("grocery_list").select("*");

  if (result.error) {
    throw new Error(result.error.message);
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

export async function updateGroceryListItem(name: string) {
  const result = await supabase.from("grocery_list").update({ name });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function deleteGroceryListItem(id: number) {
  const result = await supabase.from("grocery_list").delete().eq("id", id);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
}
