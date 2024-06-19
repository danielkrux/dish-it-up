import type { BottomSheetModal as _BottomSheetModal } from "@gorhom/bottom-sheet";
import { format } from "date-fns";
import { forwardRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import BottomSheetModal from "~/components/BottomSheetModal";
import Button from "~/components/Button";
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

const MealPlanNoteModal = forwardRef<_BottomSheetModal, MealPlanAddNoteProps>(
  (props, ref) => {
    const { watch, control, reset, setValue } = useForm<{ note: string }>();

    useEffect(() => {
      setValue("note", props.initialMealPlan?.note ?? "");
    }, [props.initialMealPlan, setValue]);

    const createMutation = useCreateMealPlan({
      onCompleted: () => {
        reset();
        // @ts-ignore
        ref.current?.dismiss();
      },
    });

    const updateMutation = useUpdateMealPlan({
      onSuccess: () => {
        reset();
        // @ts-ignore
        ref.current?.dismiss();
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

    return (
      <BottomSheetModal
        snapPoints={[310]}
        onDismiss={props.onDismiss}
        ref={ref}
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
          bottomSheet
        />
        <Button
          loading={createMutation.isLoading || updateMutation.isLoading}
          onPress={handleSave}
          size="large"
        >
          Save
        </Button>
      </BottomSheetModal>
    );
  }
);

export default MealPlanNoteModal;
