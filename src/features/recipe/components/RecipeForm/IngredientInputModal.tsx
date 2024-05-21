import React, { useImperativeHandle } from "react";
import { View } from "react-native";
import { BottomSheetModal as _BottomSheetModal } from "@gorhom/bottom-sheet";

import BottomSheetModal from "~/components/BottomSheetModal";
import Button from "~/components/Button";
import Text from "~/components/Text";
import InputBase from "~/components/Inputs/TextInputBase";

export type AddIngredientSheetProps = {
  onSave?: (value: string) => void;
};

const IngredientInputModal = React.forwardRef<
  _BottomSheetModal,
  AddIngredientSheetProps
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
    <BottomSheetModal ref={innerRef}>
      <View className="">
        <Text className="font-display text-2xl mb-4">Add Ingredient</Text>
        <InputBase
          value={value}
          bottomSheet
          onChange={(e) => setValue(e.nativeEvent.text)}
          containerClassName="mb-4"
          placeholder="Ingredient"
        />
        <Button size="large" onPress={handleSave}>
          Save
        </Button>
      </View>
    </BottomSheetModal>
  );
});

export default IngredientInputModal;
