import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Animated,
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  TextInputFocusEventData,
  TextInputProps as RNTextInputProps,
  View,
} from "react-native";

import clsx from "clsx";
import { colors } from "~/theme";
import createClassComponent from "~/utils/createClassComponent";
import Label from "./Label";
import Text from "../Text";

export type InputBaseProps = Omit<RNTextInputProps, "value"> & {
  containerClassName?: string;
  bottomSheet?: boolean;
  value?: string | null;
  label?: string;
  error?: string;
  inputStyle?: RNTextInputProps["style"];
};

const InputBase = forwardRef<RNTextInput, InputBaseProps>(
  (
    {
      bottomSheet,
      containerClassName,
      value,
      onFocus,
      onBlur,
      label,
      style,
      inputStyle,
      error,
      ...props
    },
    ref
  ) => {
    const innerRef = useRef<RNTextInput>(null);
    useImperativeHandle(ref, () => innerRef.current as RNTextInput);

    const [active, setActive] = useState(false);

    const handleBlur = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onBlur?.(e);
        return setActive(false);
      },
      [onBlur]
    );

    const handleFocus = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onFocus?.(e);
        return setActive(true);
      },
      [onFocus]
    );

    return (
      <View className={clsx("self-stretch", containerClassName)}>
        {label && <Label>{label}</Label>}
        <View className="bg-gray-100 dark:bg-gray-900 rounded-lg">
          <RNTextInput
            ref={innerRef}
            value={value ?? undefined}
            {...props}
            className={clsx(
              "font-body text-sm px-2 py-2  text-gray-900 dark:text-white"
            )}
            onBlur={handleBlur}
            onFocus={handleFocus}
            placeholderTextColor={colors.gray[500]}
            cursorColor={colors.primary[500]}
            selectionColor={colors.primary[500]}
          />
        </View>
        {error && <Text className="text-red-400 text-xs">{error}</Text>}
      </View>
    );
  }
);

export default InputBase;

export const AnimatedTextInput = Animated.createAnimatedComponent(
  createClassComponent(InputBase)
);
