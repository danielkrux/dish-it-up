import { remapProps } from "nativewind";
import { useFieldArray, useFormContext } from "react-hook-form";
import { KeyboardAwareScrollView as _KeyboardAwareScrollView } from "react-native-keyboard-controller";

import ChipInput from "~/components/Inputs/ChipInput";
import ControlledInput from "~/components/Inputs/ControlledInputs";
import { isTruthy } from "~/utils/typescript";
import useFetchCategories from "../../hooks/useFetchCategories";
import ImageInput from "./ImageInput";
import IngredientsInput from "./IngredientsInput";
import InstructionsInput from "./InstructionsInput";
import type { RecipeUpdateForm } from "./types";

const KeyboardAwareScrollView = remapProps(_KeyboardAwareScrollView, {
  contentContainerClassName: "contentContainerStyle",
});

function RecipeForm({ className }: { className?: string }) {
  const categoriesQuery = useFetchCategories();

  const form = useFormContext<RecipeUpdateForm>();
  const { control, setValue, getValues, watch } = form;

  const ingredientsFieldArray = useFieldArray({
    control,
    name: "ingredients",
    keyName: "fieldId",
  });

  const instructionsFieldArray = useFieldArray({
    control,
    name: "instructions",
    keyName: "fieldId",
  });

  return (
    <KeyboardAwareScrollView
      className={className}
      contentContainerClassName="px-4 pb-10"
    >
      <ImageInput
        initialImages={getValues("images")?.filter(isTruthy)}
        onChange={(images) => setValue("images", images)}
      />
      <ControlledInput
        label="Name"
        name="name"
        control={control}
        containerClassName="mb-4"
        returnKeyType="next"
        autoComplete="off"
      />
      <ControlledInput
        label="Description"
        name="description"
        placeholder="Write a short description about your recipe"
        control={control}
        containerClassName="mb-4"
        returnKeyType="next"
        multiline
        inputContainerClassName="min-h-[100px]"
      />
      <ControlledInput
        label="Total time"
        name="total_time"
        control={control}
        containerClassName="mb-4"
        returnKeyType="next"
        autoCorrect={false}
        spellCheck={false}
      />
      <ControlledInput
        label="Number of servings"
        name="recipe_yield"
        control={control}
        containerClassName="mb-4"
        returnKeyType="next"
        keyboardType="number-pad"
        autoCorrect={false}
        spellCheck={false}
      />
      <ChipInput
        label="Categories"
        className="mb-4"
        value={watch("categories")?.map((c) => ({
          value: String(c.id) ?? "",
          label: c.name ?? "",
        }))}
        data={categoriesQuery.data?.map((c) => ({
          value: String(c.id) ?? "",
          label: c.name ?? "",
        }))}
        onAdd={(item) => {
          setValue("categories", [
            ...(getValues("categories") ?? []),
            { name: item.label ?? "", id: Number(item.value) },
          ]);
        }}
        onRemove={(item) => {
          setValue(
            "categories",
            getValues("categories")?.filter((i) => i.id !== Number(item.value))
          );
        }}
      />
      <IngredientsInput
        className="mb-4"
        form={form}
        fieldArray={ingredientsFieldArray}
      />
      <InstructionsInput
        className="mb-4"
        form={form}
        fieldArray={instructionsFieldArray}
      />
    </KeyboardAwareScrollView>
  );
}

export default RecipeForm;
