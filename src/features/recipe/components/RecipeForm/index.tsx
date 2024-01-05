import { useCallback } from "react";
import { useFieldArray, useForm, useFormState } from "react-hook-form";
import { View } from "react-native";

import { useRouter } from "expo-router";
import Button from "~/components/Button";
import { ChipInput } from "~/components/Inputs/ChipInput";
import ControlledInput from "~/components/Inputs/ControlledInputs";
import useFetchCategories from "../../hooks/useFetchCategories";
import { Recipe, RecipeUpdate } from "../../recipe.types";
import IngredientsInput from "./IngredientsInput";
import InstructionsInput from "./InstructionsInput";

export type RecipeUpdateForm = Omit<
	RecipeUpdate,
	"ingredients" | "instructions"
> & {
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
	isLoading,
	onSubmit,
}: {
	initialRecipe?: Recipe;
	isLoading?: boolean;
	onSubmit: (data: RecipeUpdateForm) => void;
}) {
	const router = useRouter();
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

	const form = useForm<RecipeUpdateForm>({
		defaultValues: getDefaultValues(),
	});

	const {
		control,
		getValues,
		setValue,
		watch,
		handleSubmit,
		formState: { isDirty, isSubmitting },
	} = form;

	const ingredientsFieldArray = useFieldArray({
		control,
		name: "ingredients",
	});

	const instructionsFieldArray = useFieldArray({
		control,
		name: "instructions",
	});

	function handleSave() {
		if (!isDirty) {
			router.back();
			return;
		}
		handleSubmit(onSubmit)();
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
				label="Total time"
				name="total_time"
				control={control}
				returnKeyType="next"
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

			<IngredientsInput form={form} fieldArray={ingredientsFieldArray} />
			<InstructionsInput form={form} fieldArray={instructionsFieldArray} />

			<Button loading={isLoading} size="large" onPress={handleSave}>
				Save
			</Button>
		</View>
	);
}

export default RecipeForm;
