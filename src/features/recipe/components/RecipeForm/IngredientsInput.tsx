import React from "react";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import {
	NativeSyntheticEvent,
	TextInputKeyPressEventData,
	View,
} from "react-native";
import ControlledInput from "~/components/Inputs/ControlledInputs";
import Label from "~/components/Inputs/Label";
import { RecipeUpdateForm } from ".";

export type IngredientsInputProps = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	form: UseFormReturn<RecipeUpdateForm, any, undefined>;
	fieldArray: UseFieldArrayReturn<RecipeUpdateForm, "ingredients", "id">;
};

function IngredientsInput({ form, fieldArray }: IngredientsInputProps) {
	function handleSubmitEditing(index: number) {
		fieldArray.insert(
			index + 1,
			{ name: "" },
			{ focusName: `ingredients.${index + 1}.name`, shouldFocus: true },
		);
	}

	function handleKeyPress(
		e: NativeSyntheticEvent<TextInputKeyPressEventData>,
		index: number,
	) {
		const value = form.getValues(`ingredients.${index}.name`);

		if (e.nativeEvent?.key === "Backspace" && value === "" && index !== 0) {
			fieldArray.remove(index);
			form.setFocus(`ingredients.${index - 1}.name`);
		}
	}
	return (
		<View>
			<Label className="mb-2">Ingredients</Label>
			<View className="bg-gray-100 dark:bg-gray-900 rounded-lg py-1 pl-2">
				{fieldArray.fields.map((f, index) => (
					<ControlledInput
						key={f.id}
						control={form.control}
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
	);
}

export default IngredientsInput;
