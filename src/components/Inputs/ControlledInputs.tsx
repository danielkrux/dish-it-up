import { Fragment } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import { StyleSheet, View } from "react-native";

import Text from "../Text";
import IconButton from "../IconButton";
import theme from "../../theme";
import Button from "../Button";

import InputBase, { InputBaseProps } from "./TextInputBase";

type InputProps<T extends FieldValues> = InputBaseProps & {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
};

export function ControlledInput<T extends FieldValues>({
  name,
  label,
  control,
  ...props
}: InputProps<T>) {
  const { field } = useController<T>({ control, name });

  const Container = label ? View : Fragment;

  return (
    <Container>
      {label && <Text style={styles.inputLabel}>{label}</Text>}
      <InputBase
        ref={field.ref}
        {...props}
        value={field.value}
        onChangeText={field.onChange}
      />
    </Container>
  );
}

export type ArrayInputProps<T extends FieldValues> = InputProps<T> & {
  onAdd?: () => void;
  onRemove?: (index: number) => void;
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
      {values.map((_, index) => (
        <View key={index} style={styles.arrInputContainer}>
          <ControlledInput
            key={`${name}-${index}`}
            name={`${name}.${index}` as any}
            control={control}
            {...props}
            style={{ flex: 1 }}
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
});
