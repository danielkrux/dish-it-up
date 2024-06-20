import { supabase } from "~/app/_layout";
import { getSession } from "../auth/auth.service";
import type { MealPlanCreate } from "./mealPlanner.types";

export async function fetchMealPlan() {
  const result = await supabase.from("meal_plans").select("*, recipes(*)");

  if (result.error) {
    throw new Error(result?.error.message);
  }

  return result.data;
}

export async function createMealPlan(items: MealPlanCreate[]) {
  const { user } = await getSession();
  const itemsWithUserId = items.map((item) => ({ ...item, user_id: user?.id }));
  const result = await supabase.from("meal_plans").insert(itemsWithUserId);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function updateMealPlanItem(item: MealPlanCreate) {
  if (!item.id) throw new Error("Item id is required");

  const result = await supabase
    .from("meal_plans")
    .update(item)
    .eq("id", item.id)
    .select();

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function deleteMealPlan(id: number) {
  const result = await supabase.from("meal_plans").delete().eq("id", id);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
}
