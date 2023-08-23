import { ScrollView, StyleSheet, View } from "react-native";
import { useForm } from "react-hook-form";
import Button from "../../../components/Button";
import {
  Input,
  ArrayInput,
} from "../../../components/Inputs/TextInputHookForm";
import theme from "../../../theme";

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

  const onSubmit = (data: RecipeInputs) => console.log(data);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Input label="Name" name="name" control={control} returnKeyType="next" />
      <Input
        label="Description"
        name="description"
        control={control}
        returnKeyType="next"
        numberOfLines={2}
        multiline
      />
      <Input
        label="Recipe yield"
        name="recipe_yield"
        control={control}
        keyboardType="numeric"
        returnKeyType="next"
      />
      <ArrayInput
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
      <ArrayInput
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
