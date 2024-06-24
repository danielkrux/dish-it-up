import type { BottomSheetModal as _BottomSheetModal } from "@gorhom/bottom-sheet";
import { format } from "date-fns";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import BottomSheetModal from "~/components/BottomSheetModal";
import Button from "~/components/Button";
import { Dialog, DialogContent } from "~/components/Dialog/Dialog";
import ControlledInput from "~/components/Inputs/ControlledInputs";
import Text from "~/components/Text";
import { isWeb } from "~/theme";
import { useCreateMealPlan } from "../hooks/useCreateMealPlan";
import useUpdateMealPlan from "../hooks/useUpdateMealPlan";
import type { MealPlan } from "../mealPlanner.types";

export type MealPlanAddNoteProps = {
  initialMealPlan?: MealPlan;
  onDismiss: () => void;
};

function MealPlanNoteModal(props: MealPlanAddNoteProps) {
  const ref = useRef<_BottomSheetModal>(null);
  const { watch, control, reset, setValue } = useForm<{ note: string }>();
  const params = useLocalSearchParams<{ date: string; note: string }>();

  useEffect(() => {
    if (params.date && params.note === "true") {
      ref.current?.present();
    }
  }, [params.date, params.note]);

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

  const date = params.date;
  const formattedDate = date ? format(new Date(date), "EEEE") : "";

  function handleSave() {
    if (props.initialMealPlan) {
      updateMutation.mutate({
        id: props.initialMealPlan.id,
        note: watch("note"),
        date,
      });
    } else {
      createMutation.mutate([{ date: params.date, note: watch("note") }]);
    }
  }

  function handleDismiss() {
    router.navigate("/meal-planner");
    props.onDismiss?.();
  }

  const Body = ({ bottomSheet }: { bottomSheet?: boolean }) => (
    <>
      <Text size="xl" type="bodyBold" className="mb-4">
        Add a note for {formattedDate}
      </Text>
      <ControlledInput
        numberOfLines={6}
        placeholder="Note..."
        className="h-44"
        containerClassName="mb-4"
        multiline
        bottomSheet={bottomSheet}
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
    </>
  );

  if (isWeb) {
    return (
      <Dialog open={Boolean(params.date) && params.note === "true"}>
        <DialogContent onClose={handleDismiss}>
          <Body />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <BottomSheetModal snapPoints={[310]} onDismiss={handleDismiss} ref={ref}>
      <Body bottomSheet />
    </BottomSheetModal>
  );
}

export default MealPlanNoteModal;
