import { TableCreate, TableUpdate, Tables } from "../../clients/supabase";

export type MealPlanCreate = TableCreate<"meal_plans">;
export type MealPlanUpdate = TableUpdate<"meal_plans">;
export type MealPlan = Tables<"meal_plans">;
