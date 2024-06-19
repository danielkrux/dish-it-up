import type { BottomSheetModal as _BottomSheetModal } from "@gorhom/bottom-sheet";
import { format } from "date-fns";
import { forwardRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import BottomSheetModal from "~/components/BottomSheetModal";
import Button from "~/components/Button";
import ControlledInput from "~/components/Inputs/ControlledInputs";
import Text from "~/components/Text";
import { useCreateMealPlan } from "../hooks/useCreateMealPlan";
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

    const mutation = useCreateMealPlan({
      onCompleted: () => {
        reset();
        // @ts-ignore
        ref.current?.dismiss();
      },
    });

    const items = [
      {
        date: props.date?.toDateString(),
        note: watch("note"),
      },
    ];

    const date = props.date ?? props.initialMealPlan?.date;
    const formattedDate = date ? format(new Date(date), "EEEE") : "";

    return (
      <BottomSheetModal onDismiss={props.onDismiss} ref={ref}>
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
          loading={mutation.isLoading}
          onPress={() => mutation.mutate(items)}
          size="large"
        >
          Save
        </Button>
      </BottomSheetModal>
    );
  }
);

export default MealPlanNoteModal;
