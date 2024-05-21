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
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

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
    const innerRef = useRef(null);
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    useImperativeHandle(ref, () => innerRef.current!);

    const InputComponent = bottomSheet ? BottomSheetTextInput : RNTextInput;

    return (
      <View className={cn("self-stretch", containerClassName)}>
        <View>{label && <Label>{label}</Label>}</View>
        <View
          className={cn(
            "bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-900 rounded-lg",
            inputContainerClassName
          )}
        >
          <InputComponent
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
