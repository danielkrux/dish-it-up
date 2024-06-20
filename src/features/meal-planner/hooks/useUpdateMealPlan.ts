import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { MEAL_PLAN_QUERY_KEY } from "~/features/app/app.constants";
import { updateMealPlanItem } from "../mealPlanner.service";

function useUpdateMealPlan({ onSuccess }: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();

  const updateMealPlanMutation = useMutation({
    mutationFn: updateMealPlanItem,
    onSuccess: () => {
      Toast.show({ text1: "Meal plan updated!" });
      onSuccess?.();
    },
    onError: () => {
      Toast.show({
        text1: "Something went wrong",
        type: "error",
      });
    },
    onSettled: (_, error, variables) => {
      queryClient.invalidateQueries([MEAL_PLAN_QUERY_KEY]);
    },
  });

  return updateMealPlanMutation;
}

export default useUpdateMealPlan;
