import {
  Animated,
  NativeSyntheticEvent,
  Platform,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  TextInputFocusEventData,
} from "react-native";
import theme, { pallettes } from "../../theme";
import { forwardRef, useState } from "react";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import createClassComponent from "../../utils/createClassComponent";

export type InputBaseProps = Omit<RNTextInputProps, "value"> & {
  bottomSheet?: boolean;
  value?: string | null;
};

const InputBase = forwardRef(function TextInput(
  { bottomSheet, value, onFocus, onBlur, ...props }: InputBaseProps,
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
      value={value ?? undefined}
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

export default InputBase;

export const AnimatedTextInput = Animated.createAnimatedComponent(
  createClassComponent(InputBase)
);

const styles = StyleSheet.create({
  input: {
    fontFamily: "Body",
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
