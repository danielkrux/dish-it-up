import { forwardRef, useImperativeHandle, useRef } from "react";
import {
  Animated,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from "react-native";

import { colors } from "~/theme";
import createClassComponent from "~/utils/createClassComponent";
import Label from "./Label";
import Text from "../Text";
import { cn } from "~/utils/tailwind";

export type InputBaseProps = Omit<RNTextInputProps, "value"> & {
  containerClassName?: string;
  inputContainerClassName?: string;
  bottomSheet?: boolean;
  value?: string | null;
  label?: string;
  error?: string;
};

const InputBase = forwardRef<RNTextInput, InputBaseProps>(
  (
    {
      bottomSheet,
      containerClassName,
      inputContainerClassName,
      value,
      onFocus,
      onBlur,
      label,
      error,
      ...props
    },
    ref
  ) => {
    const innerRef = useRef<RNTextInput>(null);
    useImperativeHandle(ref, () => innerRef.current as RNTextInput);

    return (
      <View className={cn("self-stretch", containerClassName)}>
        <View>{label && <Label>{label}</Label>}</View>
        <View
          className={cn(
            "bg-gray-100 dark:bg-gray-900 border border-gray-100 dark:border-gray-900 rounded-lg",
            inputContainerClassName
          )}
        >
          <RNTextInput
            ref={innerRef}
            value={value ?? undefined}
            {...props}
            className={cn(
              "font-body text-base px-3 py-3 text-gray-900 dark:text-white",
              props.className
            )}
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
