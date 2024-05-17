import React, { useEffect } from "react";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import {
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import ControlledInput from "~/components/Inputs/ControlledInputs";
import Label from "~/components/Inputs/Label";
import { RecipeUpdateForm } from "./types";
import { cn } from "~/utils/tailwind";
import Icon from "~/components/Icon";
import IconButton from "~/components/IconButton";
import { useSharedValue } from "react-native-reanimated";
import DraggableItem, { Positions } from "~/components/DraggableItem";

const HEIGHT = 45.3;

type SwappedIndexes = { from: number; to: number };

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
  const positions = useSharedValue<Positions>(
    Object.assign(
      {},
      ...fieldArray.fields.map((field, i) => ({ [field.fieldId]: i }))
    )
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    positions.value = Object.assign(
      {},
      ...fieldArray.fields.map((field, i) => ({ [field.fieldId]: i }))
    );
  }, [fieldArray.fields]);

  function handleSubmitEditing(index: number) {
    fieldArray.insert(
      index + 1,
      { name: "", order: fieldArray.fields.length + 1 },
      { focusName: `ingredients.${index + 1}.name`, shouldFocus: true }
    );
  }

  function handleKeyPress(
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) {
    const value = form.getValues(`ingredients.${index}.name`);

    if (e.nativeEvent?.key === "Backspace" && value === "" && index !== 0) {
      removeInput(index);
    }
  }

  function removeInput(index: number) {
    fieldArray.remove(index);
    form.setFocus(`ingredients.${index - 1}.name`);
  }

  function swapFields({ from, to }: SwappedIndexes) {
    fieldArray.move(from, to);
  }

  return (
    <View className={className}>
      <Label className="mb-2">Ingredients</Label>
      <View
        style={{ height: fieldArray.fields.length * HEIGHT + 8 }}
        className="bg-gray-100 dark:bg-gray-900 border-gray-100 border dark:border-gray-950  rounded-lg py-1"
      >
        {fieldArray.fields.map((f, index) => {
          const isLast = index === fieldArray.fields.length - 1;

          return (
            <DraggableItem
              key={f.id}
              id={f.fieldId}
              positions={positions}
              onDragEnd={swapFields}
              height={HEIGHT}
              className={cn(
                "flex-row items-center rounded-lg px-4 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700",
                { "border-b-transparent": isLast }
              )}
            >
              <Icon
                name="AlignJustify"
                className="text-gray-300 dark:text-gray-400 mr-1"
                size={14}
              />
              <ControlledInput
                key={f.id}
                control={form.control}
                name={`ingredients.${index}.name`}
                containerClassName="bg-transparant flex-1 border-none"
                className="bg-transparant border-none"
                inputContainerClassName={cn("bg-transparent border-none")}
                blurOnSubmit={false}
                numberOfLines={1}
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
            </DraggableItem>
          );
        })}
      </View>
    </View>
  );
}

export default IngredientsInput;
