import {
  type FieldValues,
  type UseControllerProps,
  useController,
} from "react-hook-form";
import InputBase, { type InputBaseProps } from "./TextInputBase";

type InputProps<T extends FieldValues> = UseControllerProps<T> & InputBaseProps;

export default function ControlledInput<T extends FieldValues>({
  name,
  label,
  control,
  ...props
}: InputProps<T>) {
  const { field } = useController<T>({ control, name });

  return (
    <InputBase
      {...props}
      nativeID={name}
      ref={field.ref}
      label={label}
      value={field.value}
      onChangeText={field.onChange}
    />
  );
}
