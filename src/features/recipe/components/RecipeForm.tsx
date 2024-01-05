import { useCallback } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
	NativeSyntheticEvent,
	TextInputKeyPressEventData,
	View,
} from "react-native";

import Button from "~/components/Button";
import { ChipInput } from "~/components/Inputs/ChipInput";
import ControlledInput from "~/components/Inputs/ControlledInputs";
import Label from "~/components/Inputs/Label";
import useFetchCategories from "../hooks/useFetchCategories";
import { Recipe, RecipeUpdate } from "../recipe.types";

type RecipeUpdateForm = Omit<RecipeUpdate, "ingredients" | "instructions"> & {
	ingredients: { name: string; id?: number }[];
	instructions: { value: string }[];
};

const emtpyRecipe: RecipeUpdateForm = {
	name: "",
	description: "",
	recipe_yield: "",
	ingredients: [],
	instructions: [],
	total_time: "",
	categories: [],
};

function RecipeForm({
	initialRecipe,
	onSubmit,
}: {
	initialRecipe?: Recipe;
	onSubmit: (data: RecipeUpdateForm) => void;
}) {
	const categoriesQuery = useFetchCategories();

	const getDefaultValues = useCallback((): RecipeUpdateForm => {
		if (!initialRecipe) return emtpyRecipe;

		return {
			name: initialRecipe.name || "",
			description: initialRecipe.description || "",
			recipe_yield: initialRecipe.recipe_yield || "",
			total_time: initialRecipe.total_time || "",
			ingredients:
				initialRecipe.ingredients.map((i) => {
					const amount = i.amount ?? "";
					const unit = i.unit ?? "";

					return { name: `${amount} ${unit} ${i.name}`.trim(), id: i.id };
				}) || "",
			instructions:
				initialRecipe.instructions?.map((i) => ({ value: i })) || [],
			categories: initialRecipe.categories || [],
		};
	}, [initialRecipe]);

	const { control, handleSubmit, setValue, getValues, watch, setFocus } =
		useForm<RecipeUpdateForm>({
			defaultValues: getDefaultValues(),
		});

	const ingredientsFieldArray = useFieldArray({
		control,
		name: "ingredients",
	});

	const instructionsFieldArray = useFieldArray({
		control,
		name: "instructions",
	});

	function handleSubmitEditing(index: number) {
		ingredientsFieldArray.insert(
			index + 1,
			{ name: "" },
			{ focusName: `ingredients.${index + 1}.name`, shouldFocus: true },
		);
	}

	function handleKeyPress(
		e: NativeSyntheticEvent<TextInputKeyPressEventData>,
		index: number,
	) {
		const value = getValues(`ingredients.${index}.name`);

		if (e.nativeEvent?.key === "Backspace" && value === "" && index !== 0) {
			ingredientsFieldArray.remove(index);
			setFocus(`ingredients.${index - 1}.name`);
		}
	}

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
				keyboardType="number-pad"
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

			<View>
				<Label className="mb-0">Ingredients</Label>
				<View className="rounded-lg p-2 pl-0">
					{ingredientsFieldArray.fields.map((f, index) => (
						<ControlledInput
							key={f.id}
							control={control}
							name={`ingredients.${index}.name`}
							className="bg-transparent border-none"
							blurOnSubmit={false}
							numberOfLines={2}
							onSubmitEditing={() => handleSubmitEditing(index)}
							onKeyPress={(e) => handleKeyPress(e, index)}
						/>
					))}
				</View>
			</View>
			<View>
				<Label className="mb-0">Instructions</Label>
				<View className="rounded-lg p-2 pl-0">
					{instructionsFieldArray.fields.map((f, index) => (
						<ControlledInput
							key={f.id}
							control={control}
							name={`instructions.${index}.value`}
							className="bg-transparent border-none"
							multiline
							numberOfLines={2}
						/>
					))}
				</View>
			</View>
			<Button size="large" onPress={handleSubmit(onSubmit)}>
				Submit
			</Button>
		</View>
	);
}

export default RecipeForm;
