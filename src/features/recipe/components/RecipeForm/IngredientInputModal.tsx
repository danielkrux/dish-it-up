import type { BottomSheetModal as _BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useImperativeHandle } from "react";
import { View } from "react-native";

import BottomSheetModal from "~/components/BottomSheetModal";
import Button from "~/components/Button";
import ChipList from "~/components/ChipList";
import InputBase from "~/components/Inputs/TextInputBase";
import Text from "~/components/Text";

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
    <BottomSheetModal snapPoints={[300]} ref={innerRef}>
      <View className="flex-1 mb-2">
        <Text className="font-display text-2xl mb-4">Add Ingredient</Text>
        <InputBase
          value={value}
          bottomSheet
          onChangeText={setValue}
          containerClassName="mb-4"
          placeholder="Ingredient"
        />
        <ChipList
          className="mb-4 flex-1 flex-wra"
          contentContainerClassName="flex-row flex-1 flex-wrap"
          scrollEnabled={false}
          onPress={(v) => setValue(v ? `${value} ${v} ` : v)}
          data={[
            {
              label: "tablespoon",
              value: "tbsp",
            },
            {
              label: "teaspoon",
              value: "tsp",
            },
            {
              label: "gram",
              value: "g",
            },
            {
              label: "milliliter",
              value: "ml",
            },
            {
              label: "deciliter",
              value: "dl",
            },
            {
              label: "liter",
              value: "l",
            },
          ]}
        />
        <Button className="mb-auto" size="large" onPress={handleSave}>
          Save
        </Button>
      </View>
    </BottomSheetModal>
  );
});

export default IngredientInputModal;
