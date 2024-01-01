import { useCallback } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { View } from "react-native";
import Button from "~/components/Button";
import { ChipInput } from "~/components/Inputs/ChipInput";
import {
	ControlledArrayInput,
	ControlledInput,
} from "~/components/Inputs/ControlledInputs";
import Text from "~/components/Text";
import useFetchCategories from "../hooks/useFetchCategories";
import { IngredientCreate, Recipe, RecipeUpdate } from "../recipe.types";

const emptyIngredient: IngredientCreate = {
	name: "",
	amount: "",
	unit: "",
};

const emtpyRecipe: RecipeUpdate = {
	name: "",
	description: "",
	recipe_yield: "",
	ingredients: [emptyIngredient],
	instructions: [""],
	total_time: "",
	categories: [],
};

function RecipeForm({
	initialRecipe,
	onSubmit,
}: {
	initialRecipe?: Recipe;
	onSubmit: (data: RecipeUpdate) => void;
}) {
	const categoriesQuery = useFetchCategories();

	const getDefaultValues = useCallback(() => {
		if (!initialRecipe) return emtpyRecipe;

		return {
			name: initialRecipe.name || "",
			description: initialRecipe.description || "",
			recipe_yield: initialRecipe.recipe_yield || "",
			total_time: initialRecipe.total_time || "",
			ingredients: initialRecipe.ingredients || [],
			instructions: initialRecipe.instructions || [],
			categories: initialRecipe.categories || [],
		};
	}, [initialRecipe]);

	const { control, handleSubmit, setValue, getValues, watch } =
		useForm<RecipeUpdate>({
			defaultValues: getDefaultValues(),
		});

	const ingredients = useFieldArray({
		control,
		name: "ingredients",
	});

	return (
		<View className="flex-1 g-4">
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
				label="Yields"
				name="recipe_yield"
				control={control}
				returnKeyType="next"
			/>
			<ChipInput
				label="Categories"
				value={watch("categories").map((c) => ({
					value: String(c.id) ?? "",
					label: c.name ?? "",
				}))}
				data={categoriesQuery.data?.map((c) => ({
					value: String(c.id) ?? "",
					label: c.name ?? "",
				}))}
				onAdd={(item) => {
					setValue("categories", [
						...getValues("categories"),
						{ name: item.label, id: Number(item.value) },
					]);
				}}
				onRemove={(item) => {
					setValue(
						"categories",
						getValues("categories").filter((i) => i.id !== Number(item.value)),
					);
				}}
			/>
			<ControlledInput
				label="Total time"
				name="total_time"
				control={control}
				returnKeyType="next"
			/>

			<Text>Ingredients</Text>
			{ingredients.fields.map((field, index) => (
				<View className="flex-row items-center g-2" key={field.id}>
					<ControlledInput
						name={`ingredients.${index}.amount`}
						control={control}
						placeholder="Amount"
					/>
					<Text>{initialRecipe?.ingredients[index].unit}</Text>
					<ControlledInput
						name={`ingredients.${index}.name`}
						control={control}
						placeholder="Ingredient"
					/>
				</View>
			))}
			<ControlledArrayInput
				label="Instructions"
				name="instructions"
				control={control}
				values={watch("instructions") ?? []}
				onAdd={() =>
					setValue("instructions", [...(getValues().instructions ?? []), ""])
				}
				onRemove={(index) => {
					const instructions = getValues().instructions;
					instructions?.splice(index, 1);
					setValue("instructions", instructions);
				}}
			/>
			<Button size="large" onPress={handleSubmit(onSubmit)}>
				Submit
			</Button>
		</View>
	);
}

export default RecipeForm;
