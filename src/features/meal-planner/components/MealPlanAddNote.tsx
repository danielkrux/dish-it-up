import type { BottomSheetModal as _BottomSheetModal } from "@gorhom/bottom-sheet";
import React from "react";

import BottomSheetModal from "~/components/BottomSheetModal";
import Button from "~/components/Button";
import InputBase from "~/components/Inputs/TextInputBase";
import Text from "~/components/Text";

export type MealPlanAddNoteProps = null;

const MealPlanAddNote = React.forwardRef<
  _BottomSheetModal,
  MealPlanAddNoteProps
>((_, ref) => {
  return (
    <BottomSheetModal ref={ref}>
      <Text size="xl" type="bodyBold" className="mb-4">
        Add a note for Monday
      </Text>
      <InputBase
        numberOfLines={6}
        placeholder="Note..."
        className="h-44"
        containerClassName="mb-4"
        multiline
      />
      <Button size="large">Save</Button>
    </BottomSheetModal>
  );
});

export default MealPlanAddNote;
