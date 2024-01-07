import { useMutation } from "@tanstack/react-query";
import { queryClient } from "~/clients/reactQuery";
import { MEAL_PLAN_QUERY_KEY } from "~/features/app/app.constants";
import { deleteMealPlan } from "../mealPlanner.service";
import { MealPlan } from "../mealPlanner.types";

function useDeleteMealPlan({ onSettled }: { onSettled?: () => void }) {
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteMealPlan(id),
    onMutate: (id) => {
      queryClient.cancelQueries([MEAL_PLAN_QUERY_KEY]);
      const previousItems = queryClient.getQueryData<MealPlan[]>([
        MEAL_PLAN_QUERY_KEY,
      ]);
      queryClient.setQueryData<MealPlan[]>([MEAL_PLAN_QUERY_KEY], (old) => {
        return old?.filter((mealPlan) => mealPlan.id !== id) ?? [];
      });
      return { previousItems };
    },
    onError: (error, _, context) => {
      console.error(error);
      queryClient.setQueryData([MEAL_PLAN_QUERY_KEY], context?.previousItems);
    },
    onSettled: () => {
      onSettled?.();
      queryClient.invalidateQueries([MEAL_PLAN_QUERY_KEY]);
    },
  });

  return deleteMutation;
}

export default useDeleteMealPlan;
