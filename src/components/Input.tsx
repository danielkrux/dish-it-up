import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
} from "react-native";
import theme, { pallettes } from "../theme";
import { useState } from "react";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

export type TextInputProps = { bottomSheet?: boolean } & RNTextInputProps;

export default function TextInput({ bottomSheet, ...props }: TextInputProps) {
  const [active, setActive] = useState(false);
  const handleBlur = () => setActive(false);
  const handleFocus = () => setActive(true);

  const Input = bottomSheet ? BottomSheetTextInput : RNTextInput;

  return (
    <Input
      {...props}
      style={[props.style, styles.input, active && styles.inputActive]}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    alignSelf: "stretch",
    fontSize: theme.fontSize.m,
    paddingVertical: 12,
    paddingHorizontal: theme.spacing.s,
    backgroundColor: pallettes.black[100],
    borderRadius: 12,
    // padding: 12,
  },
  inputActive: {},
});
