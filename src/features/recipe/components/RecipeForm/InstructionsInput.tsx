import React from "react";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import {
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import ControlledInput from "~/components/Inputs/ControlledInputs";
import Label from "~/components/Inputs/Label";
import Text from "~/components/Text";
import { RecipeUpdateForm } from "./types";

export type IngredientsInputProps = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  form: UseFormReturn<RecipeUpdateForm, any, undefined>;
  fieldArray: UseFieldArrayReturn<RecipeUpdateForm, "instructions", "id">;
  className?: string;
};

function IngredientsInput({
  form,
  fieldArray,
  className,
}: IngredientsInputProps) {
  function handleSubmitEditing(index: number) {
    fieldArray.insert(
      index + 1,
      { value: "" },
      { focusName: `instructions.${index + 1}.value`, shouldFocus: true }
    );
  }

  function handleKeyPress(
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) {
    const value = form.getValues(`instructions.${index}.value`);

    if (e.nativeEvent?.key === "Enter") {
      fieldArray.insert(
        index + 1,
        { value: "" },
        {
          focusName: `instructions.${index + 1}.value`,
          shouldFocus: true,
        }
      );
    }

    if (e.nativeEvent?.key === "Backspace" && value === "" && index !== 0) {
      fieldArray.remove(index);
      form.setFocus(`instructions.${index - 1}.value`);
    }
  }

  return (
    <View className={className}>
      <Label className="mb-2">Instructions</Label>
      <View className="bg-gray-100 dark:bg-gray-900 rounded-lg py-1 px-2 min-h-[100]">
        {fieldArray.fields.map((f, index) => (
          <View key={f.id} className="flex-row flex-1">
            <Text className="mt-2 text-base font-display">{index + 1}</Text>
            <ControlledInput
              key={f.id}
              control={form.control}
              name={`instructions.${index}.value`}
              containerClassName="bg-transparent border-none flex-1"
              blurOnSubmit={true}
              multiline={true}
              onSubmitEditing={() => handleSubmitEditing(index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

export default IngredientsInput;
