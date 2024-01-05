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
import Label from "./Label";

export type InputBaseProps = Omit<RNTextInputProps, "value"> & {
	bottomSheet?: boolean;
	value?: string | null;
	label?: string;
};

const InputBase = forwardRef<RNTextInput, InputBaseProps>(
	(
		{
			bottomSheet,
			value,
			onFocus,
			onBlur,
			label,
			style,
			...props
		},
		ref,
	) => {
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

		return (
			<View className="self-stretch flex-1">
				{label && <Label>{label}</Label>}
				<View
					className={clsx("flex-1 rounded-lg bg-gray-100 dark:bg-gray-900", {
					})}
					style={style}
				>
					<RNTextInput
						ref={innerRef}
						value={value ?? undefined}
						className="font-body text-sm flex-1 px-2 py-2 text-gray-900 dark:text-white"
						{...props}
						onBlur={handleBlur}
						onFocus={handleFocus}
						placeholderTextColor={colors.gray[500]}
						cursorColor={colors.primary[500]}
						selectionColor={colors.primary[500]}
					/>
				</View>
			</View>
		);
	},
);

export default styled(InputBase);

export const AnimatedTextInput = Animated.createAnimatedComponent(
	createClassComponent(InputBase),
);
