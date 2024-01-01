import {
	FieldArrayWithId,
	FieldValues,
	UseControllerProps,
	UseFieldArrayAppend,
	UseFieldArrayRemove,
	useController,
} from "react-hook-form";
import { StyleSheet, View } from "react-native";

import theme from "~/theme";
import IconButton from "../IconButton";
import Text from "../Text";

import Button from "../Button";
import InputBase, { InputBaseProps } from "./TextInputBase";

type InputProps<T extends FieldValues> = UseControllerProps<T> &
	InputBaseProps & {
		label?: string;
	};

export function ControlledInput<T extends FieldValues>({
	name,
	label,
	control,
	...props
}: InputProps<T>) {
	const { field } = useController<T>({ control, name });

	return (
		<View className="flex-1 self-stretch">
			{label && <Text style={styles.inputLabel}>{label}</Text>}
			<InputBase
				ref={field.ref}
				{...props}
				value={field.value}
				onChangeText={field.onChange}
			/>
		</View>
	);
}

export type ArrayInputProps2<T extends FieldValues> = InputProps<T> & {
	append: UseFieldArrayAppend<T>;
	remove: UseFieldArrayRemove;
	fields: FieldArrayWithId<T>[];
};

export type ArrayInputProps<T extends FieldValues> = InputProps<T> & {
	onAdd?: () => void;
	onRemove?: (index: number) => void;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	values: any[];
};
export function ControlledArrayInput<T extends FieldValues>({
	name,
	label,
	control,
	values,
	onAdd,
	onRemove,
	...props
}: ArrayInputProps<T>) {
	return (
		<View style={styles.arrGroupContainer}>
			{label && <Text style={styles.inputLabel}>{label}</Text>}
			{values?.map((value, index) => (
				<View key={`${value}-${index}`} style={styles.arrInputContainer}>
					<ControlledInput
						key={`${name}-${index}`}
						// biome-ignore lint/suspicious/noExplicitAny: <explanation>
						name={`${name}.${index}` as any}
						control={control}
						{...props}
						style={styles.arrInput}
					/>
					<IconButton
						ghost
						icon="minus"
						size="large"
						onPress={() => onRemove?.(index)}
					/>
				</View>
			))}
			<Button icon="plus" size="small" onPress={onAdd}>
				Add
			</Button>
		</View>
	);
}

export function ControlledArrayInput2<T extends FieldValues>({
	name,
	label,
	control,
	fields,
	append,
	remove,
}: ArrayInputProps2<T>) {
	return (
		<View style={styles.arrGroupContainer}>
			{label && <Text style={styles.inputLabel}>{label}</Text>}
			{fields.map((field, index) => (
				<View key={field.id} style={styles.arrInputContainer}>
					<ControlledInput
						// @ts-ignore
						name={`${name}.${index}.name`}
						control={control}
						style={styles.arrInput}
					/>
					<IconButton
						ghost
						icon="minus"
						size="large"
						onPress={() => remove(index)}
					/>
				</View>
			))}
			{/* @ts-ignore */}
			<Button icon="plus" size="small" onPress={append}>
				Add
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	inputLabel: {
		marginBottom: theme.spacing.xs,
		marginLeft: theme.spacing.xs,
	},
	arrGroupContainer: {
		marginBottom: theme.spacing.s,
	},
	arrInputContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: theme.spacing.s,
		marginBottom: theme.spacing.xs,
	},
	arrInput: {
		flex: 1,
	},
});
