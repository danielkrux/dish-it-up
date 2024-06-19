import { format } from "date-fns";
import { router, useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import Button from "~/components/Button";
import { Dialog, DialogContent } from "~/components/Dialog/Dialog";
import ControlledInput from "~/components/Inputs/ControlledInputs";
import Text from "~/components/Text";
import { useCreateMealPlan } from "../hooks/useCreateMealPlan";
import useUpdateMealPlan from "../hooks/useUpdateMealPlan";
import type { MealPlan } from "../mealPlanner.types";

export type MealPlanAddNoteProps = {
  date?: Date;
  initialMealPlan?: MealPlan;
  onDismiss: () => void;
};

export default function MealplanNoteModal(props: MealPlanAddNoteProps) {
  const params = useLocalSearchParams<{ date: string; note: string }>();
  const { watch, control, reset, setValue } = useForm<{ note: string }>();

  const createMutation = useCreateMealPlan({
    onCompleted: () => {
      reset();
      handleClose();
    },
  });

  const updateMutation = useUpdateMealPlan({
    onSuccess: () => {
      reset();
      handleClose();
    },
  });

  const date = props.date ?? props.initialMealPlan?.date;
  const formattedDate = date ? format(new Date(date), "EEEE") : "";

  function handleSave() {
    if (props.initialMealPlan) {
      updateMutation.mutate({
        id: props.initialMealPlan.id,
        note: watch("note"),
        date: props.initialMealPlan.date,
      });
    } else {
      createMutation.mutate([
        { date: props.date?.toDateString(), note: watch("note") },
      ]);
    }
  }

  function handleClose() {
    router.navigate("/meal-planner");
  }

  return (
    <Dialog open={Boolean(params.date) && params.note === "true"}>
      <DialogContent
        onClose={handleClose}
        className="max-h-screen-3/4 overflow-scroll max-w-lg"
      >
        <Text size="xl" type="bodyBold" className="mb-4">
          Add a note for {formattedDate}
        </Text>
        <ControlledInput
          numberOfLines={6}
          placeholder="Note..."
          className="h-44"
          containerClassName="mb-4"
          multiline
          name="note"
          control={control}
        />
        <Button
          loading={createMutation.isLoading || updateMutation.isLoading}
          onPress={handleSave}
          size="large"
        >
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}
