import { queryClient } from "~/clients/reactQuery";
import { fetchGroceryList } from "../grocery-list/groceryList.service";
import { fetchMealPlan } from "../meal-planner/mealPlanner.service";
import {
  GROCERY_LIST_QUERY_KEY,
  MEAL_PLAN_QUERY_KEY,
  RECIPES_LAST_MADE_QUERY_KEY,
} from "./app.constants";

export function init() {
  queryClient.prefetchQuery([GROCERY_LIST_QUERY_KEY], fetchGroceryList);
  queryClient.prefetchQuery([MEAL_PLAN_QUERY_KEY], fetchMealPlan);
  queryClient.prefetchQuery(RECIPES_LAST_MADE_QUERY_KEY);
}
