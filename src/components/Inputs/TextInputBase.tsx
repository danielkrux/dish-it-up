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
import { styled } from "nativewind";
import { colors } from "~/theme";
import createClassComponent from "~/utils/createClassComponent";

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
			[onBlur],
		);

		const handleFocus = useCallback(
			(e: NativeSyntheticEvent<TextInputFocusEventData>) => {
				onFocus?.(e);
				return setActive(true);
			},
			[onFocus],
		);

		const clearTextInput = () => {
			innerRef.current?.clear();
			props.onChangeText?.("");
		};

		return (
			<View
				className={clsx(
					"flex-row rounded-lg bg-gray-100 border border-gray-100 dark:bg-gray-900 dark:border-gray-900",
					{ "border-gray-200 dark:border-gray-800": active },
				)}
			>
				<RNTextInput
					ref={innerRef}
					value={value ?? undefined}
					{...props}
					className="font-body text-sm flex-1 px-2 py-2 text-gray-900 dark:text-white"
					onBlur={handleBlur}
					onFocus={handleFocus}
					placeholderTextColor={colors.gray[500]}
					cursorColor={colors.primary[500]}
					selectionColor={colors.primary[500]}
				/>
				{/* {active && !props.multiline && Boolean(value?.length) && (
					<IconButton
						style={{ paddingLeft: 0 }}
						onPress={clearTextInput}
						ghost
						icon="x"
						size="medium"
					/>
				)} */}
			</View>
		);
	},
);

export default styled(InputBase);

export const AnimatedTextInput = Animated.createAnimatedComponent(
	createClassComponent(InputBase),
);
