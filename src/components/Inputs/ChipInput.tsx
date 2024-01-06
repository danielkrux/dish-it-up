import { styled } from "nativewind";
import { useState } from "react";
import {
	NativeSyntheticEvent,
	StyleSheet,
	TextInput,
	TextInputKeyPressEventData,
	TextInputSubmitEditingEventData,
	View,
	ViewProps,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import theme, { colors } from "~/theme";
import { nanoid } from "~/utils/random";
import Chip, { ChipData } from "../Chip";
import Label from "./Label";
import { InputBaseProps } from "./TextInputBase";

type ChipInputProps = Omit<InputBaseProps, "value"> & {
	onAdd?: (value: ChipData) => void;
	onRemove?: (vaue: ChipData) => void;
	data?: ChipData[];
	label: string;
	value?: ChipData[];
	style?: ViewProps["style"];
};

function ChipInput({
	onAdd,
	onRemove,
	data,
	value = [],
	label,
	style,
}: ChipInputProps) {
	const [inputValue, setInputValue] = useState("");

	function handleSuggestionPress(chipValue: string) {
		const item = data?.find((item) => item.value === chipValue);
		if (!item) return;

		if (value.find((i) => i.value === item.value)) {
			onRemove?.(item);
		} else {
			onAdd?.(item);
		}
	}

	function handleSelectChipPress(chipValue: string) {
		const item = value?.find((item) => item.value === chipValue);
		if (!item) return;

		onRemove?.(item);
	}

	function handleAddChip(
		e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
	) {
		const value = e.nativeEvent.text;
		onAdd?.({ label: value, value: nanoid() });
		setInputValue("");
	}

	function handleKeyPress(e: NativeSyntheticEvent<TextInputKeyPressEventData>) {
		if (e.nativeEvent.key === Key.Backspace && inputValue?.length === 0) {
			const lastItem = value[value.length - 1];
			onRemove?.(lastItem);
		}
	}

	return (
		<View style={style}>
			<Label>{label}</Label>
			<View className="mt-0 flex-row flex-wrap g-1 rounded-lg items-center py-1 bg-gray-100 border border-gray-100 dark:bg-gray-900 dark:border-gray-800 pl-1.5">
				{value?.map((item, i) => (
					<Chip
						key={`${item}-${i}`}
						{...item}
						onPress={handleSelectChipPress}
						isSelected
					/>
				))}
				<TextInput
					blurOnSubmit={false}
					value={inputValue}
					onChangeText={setInputValue}
					onSubmitEditing={handleAddChip}
					onKeyPress={handleKeyPress}
					placeholder="Create category..."
					placeholderTextColor={colors.gray[500]}
					cursorColor={colors.primary[500]}
					selectionColor={colors.primary[500]}
					className="flex-1 text-white font-body text-sm mr-1 py-1 ml-2"
				/>
			</View>
			<ScrollView
				showsHorizontalScrollIndicator={false}
				horizontal
				contentContainerStyle={styles.suggestions}
			>
				{data?.map((item, i) => {
					if (value.find((i) => i.value === item.value)) return;

					return (
						<Chip
							key={`${item.value}-${i}`}
							{...item}
							onPress={handleSuggestionPress}
						/>
					);
				})}
			</ScrollView>
		</View>
	);
}

export default styled(ChipInput);

const styles = StyleSheet.create({
	suggestions: {
		marginTop: 4,
		gap: theme.spacing.xs / 2,
	},
});

export enum Key {
	Backspace = "Backspace",
}
