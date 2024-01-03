import { supabase } from "~/app/_layout";
import { getSession } from "../auth/auth.service";
import { Ingredient, IngredientCreate } from "../recipe/recipe.types";
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

export async function createGroceryList(
  items: (Ingredient | IngredientCreate)[]
) {
  const { user } = await getSession();

  const itemsToInsert = items.map((item) => {
    const name = item.name ?? "";
    const amount = item.amount ? Number(item.amount) : "";
    const unit = item.unit ?? "";

    const label = `${amount} ${unit} ${name}`.trim();

    return {
      name: label,
      user_id: user.id,
    };
  });

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
