import { supabase } from "~/app/_layout";
import { MealPlanCreate } from "./mealPlanner.types";

export async function fetchMealPlan() {
  const result = await supabase.from("meal_plans").select("*, recipes(*)");

  if (result.error) {
    throw new Error(result?.error.message);
  }

  return result.data;
}

export async function createMealPlan(items: MealPlanCreate[]) {
  const result = await supabase.from("meal_plans").insert(items);

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function updateMealPlanItem(item: MealPlanCreate) {
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
