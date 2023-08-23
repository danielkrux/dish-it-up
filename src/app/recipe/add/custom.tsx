import { ScrollView, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import {
  AvoidSoftInput,
  useSoftInputAppliedOffsetChanged,
} from "react-native-avoid-softinput";

import Button from "../../../components/Button";
import {
  ControlledInput,
  ControlledArrayInput,
} from "../../../components/Inputs/TextInputHookForm";
import theme from "../../../theme";
import { useCallback } from "react";
import { useFocusEffect } from "expo-router";

type RecipeInputs = {
  name: string;
  description: string;
  recipe_yield: number;
  ingredients: string[];
  instructions: string[];
};

function AddRecipe() {
  const { control, handleSubmit, setValue, getValues, watch } =
    useForm<RecipeInputs>({
      defaultValues: {
        name: "",
        description: "",
        recipe_yield: 0,
        ingredients: ["", ""],
        instructions: [""],
      },
    });

  const onFocusEffect = useCallback(() => {
    AvoidSoftInput.setShouldMimicIOSBehavior(true);
    AvoidSoftInput.setEnabled(true);
    return () => {
      AvoidSoftInput.setEnabled(false);
      AvoidSoftInput.setShouldMimicIOSBehavior(false);
    };
  }, []);

  useFocusEffect(onFocusEffect);

  const onSubmit = (data: RecipeInputs) => console.log(data);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ControlledInput
        label="Name"
        name="name"
        control={control}
        returnKeyType="next"
      />
      <ControlledInput
        label="Description"
        name="description"
        control={control}
        returnKeyType="next"
        numberOfLines={2}
        multiline
        style={{ minHeight: 100 }}
      />
      <ControlledInput
        label="Recipe yield"
        name="recipe_yield"
        control={control}
        keyboardType="numeric"
        returnKeyType="next"
      />
      <ControlledArrayInput
        label="Ingredients"
        name="ingredients"
        control={control}
        returnKeyType="next"
        values={watch("ingredients")}
        onAdd={() => setValue("ingredients", [...getValues().ingredients, ""])}
        onRemove={(index) => {
          const ingredients = getValues().ingredients;
          ingredients.splice(index, 1);
          setValue("ingredients", ingredients);
        }}
      />
      <ControlledArrayInput
        label="Instructions"
        name="instructions"
        control={control}
        values={watch("instructions")}
        onAdd={() =>
          setValue("instructions", [...getValues().instructions, ""])
        }
        onRemove={(index) => {
          const instructions = getValues().instructions;
          instructions.splice(index, 1);
          setValue("instructions", instructions);
        }}
      />
      <Button size="large" onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </ScrollView>
  );
}

export default AddRecipe;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.xl,
    gap: theme.spacing.s,
  },
});
