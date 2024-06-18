import type { BottomSheetModal as _BottomSheetModal } from "@gorhom/bottom-sheet";
import { format } from "date-fns";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import BottomSheetModal from "~/components/BottomSheetModal";
import Button from "~/components/Button";
import ControlledInput from "~/components/Inputs/ControlledInputs";
import Text from "~/components/Text";
import { useCreateMealPlan } from "../hooks/useCreateMealPlan";

export type MealPlanAddNoteProps = {
  date?: Date;
};

const MealPlanAddNote = forwardRef<_BottomSheetModal, MealPlanAddNoteProps>(
  ({ date }, ref) => {
    const { getValues, control, reset } = useForm();

    const mutation = useCreateMealPlan({
      items: [
        {
          note: getValues("note"),
          date: date?.toDateString() ?? "",
        },
      ],
      onCompleted: () => {
        reset();
        // @ts-ignore
        ref.current?.dismiss();
      },
    });

    return (
      <BottomSheetModal ref={ref}>
        <Text size="xl" type="bodyBold" className="mb-4">
          Add a note for {format(date ?? new Date(), "EEEE")}
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
          loading={mutation.isLoading}
          onPress={() => mutation.mutate()}
          size="large"
        >
          Save
        </Button>
      </BottomSheetModal>
    );
  }
);

export default MealPlanAddNote;
