import { TableCreate, TableUpdate, Tables } from "~/clients/supabase";
import { Recipe } from "../recipe/recipe.types";

export type MealPlanCreate = TableCreate<"meal_plans">;
export type MealPlanUpdate = TableUpdate<"meal_plans">;
export type MealPlan = Tables<"meal_plans"> & {
  recipes: Tables<"recipes"> | null;
};
