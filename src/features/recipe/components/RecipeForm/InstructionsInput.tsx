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
import { cn } from "~/utils/tailwind";
import IconButton from "~/components/IconButton";

export type IngredientsInputProps = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  form: UseFormReturn<RecipeUpdateForm, any, undefined>;
  fieldArray: UseFieldArrayReturn<RecipeUpdateForm, "instructions", "fieldId">;
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

    if (e.nativeEvent?.key === "Backspace" && value === "" && index !== 0) {
      fieldArray.remove(index);
      form.setFocus(`instructions.${index - 1}.value`);
    }
  }

  function removeInput(index: number) {
    fieldArray.remove(index);
    form.setFocus(`ingredients.${index - 1}.name`);
  }

  return (
    <View className={className}>
      <Label className="mb-2">Instructions</Label>
      <View className="bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-900 border rounded-lg py-2 px-4 min-h-[100]">
        {fieldArray.fields.map((f, index) => {
          const isLast = index === fieldArray.fields.length - 1;

          return (
            <View
              key={f.fieldId}
              className={cn(
                "flex-row items-center border-b border-gray-100 dark:border-b-gray-700",
                {
                  "border-b-transparent": isLast,
                }
              )}
            >
              <Text className="mt-4 text-base font-display self-start">
                {index + 1}
              </Text>
              <ControlledInput
                key={f.fieldId}
                control={form.control}
                name={`instructions.${index}.value`}
                containerClassName="flex-1"
                inputContainerClassName="border-gray-50"
                blurOnSubmit={true}
                multiline={true}
                onSubmitEditing={() => handleSubmitEditing(index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
              <IconButton
                icon="Minus"
                className="bg-red-400 dark:bg-red-500/50 p-1"
                iconClassName="text-white"
                size="medium"
                onPress={() => removeInput(index)}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default IngredientsInput;
