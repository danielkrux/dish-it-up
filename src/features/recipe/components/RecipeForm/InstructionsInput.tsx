import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { useRef } from "react";
import type { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { View } from "react-native";

import Button from "~/components/Button";
import IconButton from "~/components/IconButton";
import ControlledInput from "~/components/Inputs/ControlledInputs";
import Label from "~/components/Inputs/Label";
import Text from "~/components/Text";
import { cn } from "~/utils/tailwind";
import InstructionsInputModal from "./InstructionsInputModal";
import type { RecipeUpdateForm } from "./types";

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
  const inputModalRef = useRef<BottomSheetModal>(null);

  function handleInstructionSave(value: string) {
    fieldArray.append({ value }, { shouldFocus: false });
  }

  function removeInput(index: number) {
    fieldArray.remove(index);
  }

  return (
    <>
      <View className={className}>
        <Label className="mb-2">Instructions</Label>
        <View className="bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-900 border rounded-lg pt-2 pb-4 px-4 min-h-[100]">
          {fieldArray.fields.map((f, index) => {
            const isLast = index === fieldArray.fields.length - 1;

            return (
              <View
                key={f.fieldId}
                className={cn(
                  "flex-row items-center border-b border-gray-100 dark:border-b-gray-700",
                  { "border-b-transparent": isLast }
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
                  multiline={true}
                />
                <IconButton
                  icon="Minus"
                  className="bg-red-400 dark:bg-red-500/50 p-1 self-start mt-4"
                  iconClassName="text-white"
                  size="medium"
                  onPress={() => removeInput(index)}
                />
              </View>
            );
          })}
          <View className="mx-4 mt-2">
            <Button
              className="rounded-full"
              variant="secondary"
              icon="Plus"
              onPress={() => inputModalRef.current?.present()}
            >
              Add Instruction
            </Button>
          </View>
        </View>
      </View>
      <InstructionsInputModal
        ref={inputModalRef}
        onSave={handleInstructionSave}
      />
    </>
  );
}

export default IngredientsInput;
