import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
} from "react-native";
import theme, { pallettes } from "../theme";
import { useState } from "react";

export default function TextInput({ ...props }: RNTextInputProps) {
  const [active, setActive] = useState(false);
  const handleBlur = () => setActive(false);
  const handleFocus = () => setActive(true);

  return (
    <RNTextInput
      {...props}
      style={[props.style, styles.input, active && styles.inputActive]}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: theme.fontSize.m,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.s,
    backgroundColor: pallettes.black[100],
    // borderBottomWidth: 2,
    // borderBottomColor: pallettes.black[100],
    borderRadius: 4,
    maxHeight: 100,
  },
  inputActive: {},
});
