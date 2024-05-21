import React, { useRef } from "react";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import ControlledInput from "~/components/Inputs/ControlledInputs";
import Label from "~/components/Inputs/Label";
import { RecipeUpdateForm } from "./types";
import { cn } from "~/utils/tailwind";
import IconButton from "~/components/IconButton";
import IngredientInputModal from "./IngredientInputModal";
import Button from "~/components/Button";

export type IngredientsInputProps = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  form: UseFormReturn<RecipeUpdateForm, any, undefined>;
  fieldArray: UseFieldArrayReturn<RecipeUpdateForm, "ingredients", "fieldId">;
  className?: string;
};

function IngredientsInput({
  form,
  fieldArray,
  className,
}: IngredientsInputProps) {
  const inputModalRef = useRef<BottomSheetModal>(null);

  function removeInput(index: number) {
    fieldArray.remove(index);
    form.setFocus(`ingredients.${index - 1}.name`);
  }

  function handleIngredientSave(value: string) {
    fieldArray.append(
      { name: value, order: fieldArray.fields.length },
      { shouldFocus: false }
    );
  }

  return (
    <>
      <View className={className}>
        <Label className="mb-2">Ingredients</Label>
        <View className="bg-gray-50 dark:bg-gray-900 border-gray-100 border dark:border-gray-950  rounded-lg py-1 pb-4">
          <View>
            {fieldArray.fields.map((f, index) => {
              const isLast = index === fieldArray.fields.length - 1;

              return (
                <View
                  key={f.fieldId}
                  className={cn(
                    "flex-row w-full items-center rounded-lg px-4 border-b border-gray-100 dark:border-gray-700",
                    { "border-b-transparent": isLast }
                  )}
                >
                  <ControlledInput
                    key={f.id}
                    control={form.control}
                    name={`ingredients.${index}.name`}
                    containerClassName="flex-1"
                    className="pl-0"
                    inputContainerClassName="border-gray-50"
                    blurOnSubmit={false}
                    numberOfLines={1}
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
          <View className="mx-4 mt-2">
            <Button
              className="rounded-full"
              variant="secondary"
              icon="Plus"
              onPress={() => inputModalRef.current?.present()}
            >
              Add Ingredient
            </Button>
          </View>
        </View>
      </View>
      <IngredientInputModal onSave={handleIngredientSave} ref={inputModalRef} />
    </>
  );
}

export default IngredientsInput;
