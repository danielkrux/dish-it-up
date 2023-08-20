import {
  Animated,
  NativeSyntheticEvent,
  Platform,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  TextInputFocusEventData,
} from "react-native";
import theme, { pallettes } from "../theme";
import { forwardRef, useState } from "react";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import createClassComponent from "../utils/createClassComponent";

export type TextInputProps = { bottomSheet?: boolean } & RNTextInputProps;

const TextInput = forwardRef(function TextInput(
  { bottomSheet, onFocus, onBlur, ...props }: TextInputProps,
  ref: any
) {
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
      ref={ref}
      {...props}
      style={[props.style, styles.input, active && styles.inputActive]}
      onBlur={handleBlur}
      onFocus={handleFocus}
      placeholderTextColor={pallettes.black[600]}
      cursorColor={theme.colors.secondary}
      selectionColor={theme.colors.secondary}
    />
  );
});

export default TextInput;

export const AnimatedTextInput = Animated.createAnimatedComponent(
  createClassComponent(TextInput)
);

const styles = StyleSheet.create({
  input: {
    fontFamily: "InterRegular",
    alignSelf: "stretch",
    fontSize: theme.fontSize.m,
    paddingVertical: Platform.select({
      ios: theme.spacing.s,
      android: theme.spacing.xs,
    }),
    paddingHorizontal: theme.spacing.m,
    borderRadius: 16,
    backgroundColor: theme.colors.background,
    borderWidth: 2,
    borderColor: theme.colors.background,
  },
  inputActive: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.secondary,
  },
});
