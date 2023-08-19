import {
  Animated,
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  TextInputFocusEventData,
} from "react-native";
import theme, { pallettes } from "../theme";
import { useState } from "react";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import createClassComponent from "../utils/createClassComponent";

export type TextInputProps = { bottomSheet?: boolean } & RNTextInputProps;

export default function TextInput({
  bottomSheet,
  onFocus,
  onBlur,
  ...props
}: TextInputProps) {
  const [active, setActive] = useState(false);
  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onBlur?.(e);
    return setActive(false);
  };
  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onFocus?.(e);
    return setActive(true);
  };

  const Input = bottomSheet ? BottomSheetTextInput : RNTextInput;

  return (
    <Input
      {...props}
      style={[props.style, styles.input, active && styles.inputActive]}
      onBlur={handleBlur}
      onFocus={handleFocus}
      placeholderTextColor={pallettes.black[500]}
    />
  );
}

export const AnimatedTextInput = Animated.createAnimatedComponent(
  createClassComponent(TextInput)
);

const styles = StyleSheet.create({
  input: {
    fontFamily: "InterRegular",
    alignSelf: "stretch",
    fontSize: theme.fontSize.m,
    paddingVertical: 12,
    paddingHorizontal: theme.spacing.s,
    backgroundColor: pallettes.black[100],
    borderRadius: 12,
  },
  inputActive: {},
});
