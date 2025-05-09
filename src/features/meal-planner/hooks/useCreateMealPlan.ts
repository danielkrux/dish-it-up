import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MEAL_PLAN_QUERY_KEY } from "~/features/app/app.constants";
import { createMealPlan } from "../mealPlanner.service";
import type { MealPlanCreate } from "../mealPlanner.types";

export function useCreateMealPlan({
  onCompleted,
}: {
  onCompleted?: () => void;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (items: MealPlanCreate[]) => createMealPlan(items),
    onSettled: () => {
      onCompleted?.();
      queryClient.invalidateQueries([MEAL_PLAN_QUERY_KEY]);
    },
  });

  return mutation;
}
