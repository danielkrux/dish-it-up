import type { BottomSheetModal as _BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useImperativeHandle } from "react";

import BottomSheetModal from "~/components/BottomSheetModal";
import Button from "~/components/Button";
import InputBase from "~/components/Inputs/TextInputBase";
import Text from "~/components/Text";

export type InstructionsInputModalProps = {
  onSave?: (value: string) => void;
};

const InstructionsInputModal = React.forwardRef<
  _BottomSheetModal,
  InstructionsInputModalProps
>(({ onSave }, ref) => {
  const [value, setValue] = React.useState<string>("");
  const innerRef = React.useRef<_BottomSheetModal>(null);
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  useImperativeHandle(ref, () => innerRef.current!);

  function handleSave() {
    onSave?.(value);
    setValue("");
    innerRef.current?.dismiss();
  }

  return (
    <BottomSheetModal snapPoints={[300]} ref={innerRef}>
      <Text className="font-display text-2xl mb-4">Add Instruction</Text>
      <InputBase
        defaultValue={value}
        onChangeText={(t) => setValue(t)}
        containerClassName="mb-4"
        bottomSheet
        multiline
        numberOfLines={4}
        className="min-h-[150px]"
        placeholder="Instruction"
      />
      <Button size="large" onPress={handleSave}>
        Save
      </Button>
    </BottomSheetModal>
  );
});

export default InstructionsInputModal;
