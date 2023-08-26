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
  Platform,
  StyleSheet,
  TextInput as RNTextInput,
  TextInputFocusEventData,
  TextInputProps as RNTextInputProps,
  View,
} from "react-native";

import theme, { pallettes } from "../../theme";
import createClassComponent from "../../utils/createClassComponent";
import IconButton from "../IconButton";

export type InputBaseProps = Omit<RNTextInputProps, "value"> & {
  bottomSheet?: boolean;
  value?: string | null;
};

const InputBase = forwardRef<RNTextInput, InputBaseProps>(
  ({ bottomSheet, value, onFocus, onBlur, ...props }, ref) => {
    const innerRef = useRef<RNTextInput>(null);
    useImperativeHandle(ref, () => innerRef.current as RNTextInput);

    const [active, setActive] = useState(false);

    const handleBlur = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onBlur?.(e);
        return setActive(false);
      },
      [onBlur, setActive]
    );

    const handleFocus = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        onFocus?.(e);
        return setActive(true);
      },
      [onFocus, setActive]
    );

    const clearTextInput = () => {
      innerRef.current?.clear();
      props.onChangeText?.("");
    };

    return (
      <View
        style={[styles.container, active && styles.inputActive, props.style]}
      >
        <RNTextInput
          ref={innerRef}
          value={value ?? undefined}
          {...props}
          style={styles.input}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholderTextColor={pallettes.black[600]}
          cursorColor={theme.colors.secondary}
          selectionColor={theme.colors.secondary}
        />
        {active && !props.multiline && Boolean(value?.length) && (
          <IconButton
            style={{ paddingLeft: 0 }}
            onPress={clearTextInput}
            ghost
            icon="x"
            size="medium"
          />
        )}
      </View>
    );
  }
);

export default InputBase;

export const AnimatedTextInput = Animated.createAnimatedComponent(
  createClassComponent(InputBase)
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "#FAFAFA",
    borderWidth: 2,
    borderColor: "#ECECEC80",
  },
  input: {
    fontFamily: "Body",
    fontSize: theme.fontSize.m,
    flex: 1,
    paddingTop: Platform.select({
      ios: theme.spacing.s,
      android: theme.spacing.xs,
    }),
    paddingBottom: Platform.select({
      ios: theme.spacing.s,
      android: theme.spacing.xs,
    }),
    paddingHorizontal: theme.spacing.m,
  },
  inputActive: {
    borderColor: "#ECECEC",
  },
});
