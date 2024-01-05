import { useState } from "react";
import {
	NativeSyntheticEvent,
	StyleSheet,
	TextInput,
	TextInputKeyPressEventData,
	TextInputSubmitEditingEventData,
	View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import clsx from "clsx";
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
};

export function ChipInput({
	onAdd,
	onRemove,
	data,
	value = [],
	label,
}: ChipInputProps) {
	const [inputValue, setInputValue] = useState("");
	const [active, setActive] = useState(false);

	function handleBlur() {
		setActive(false);
	}

	function handleFocus() {
		setActive(true);
	}

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
		<View>
			<Label>{label}</Label>
			<View className="mt-0 flex-row flex-wrap g-1 rounded-lg items-center py-1 bg-gray-100 border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
				{value?.map((item, i) => (
					<Chip
						key={`${item}-${i}`}
						className={clsx({ "ml-1": i === 0 })}
						{...item}
						onPress={handleSelectChipPress}
						isSelected
					/>
				))}
				<TextInput
					onBlur={handleBlur}
					onFocus={handleFocus}
					blurOnSubmit={false}
					value={inputValue}
					onChangeText={setInputValue}
					onSubmitEditing={handleAddChip}
					onKeyPress={handleKeyPress}
					placeholder="Create category..."
					placeholderTextColor={colors.gray[500]}
					cursorColor={colors.primary[500]}
					selectionColor={colors.primary[500]}
					className={clsx("flex-1 mr-1 py-2 ml-2", {
						"ml-1": value.length,
					})}
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

const styles = StyleSheet.create({
	suggestions: {
		marginTop: 4,
		gap: theme.spacing.xs / 2,
	},
});

export enum Key {
	Backspace = "Backspace",
}
