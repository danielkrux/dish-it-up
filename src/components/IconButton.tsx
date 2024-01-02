import clsx from "clsx";
import { styled } from "nativewind";
import { useState } from "react";
import { Pressable, PressableProps } from "react-native";
import theme from "../theme";
import Icon, { IconName } from "./Icon";

export type IconButtonProps = {
	icon: IconName;
	size?: "small" | "medium" | "large";
	ghost?: boolean;
} & PressableProps;

function IconButton({
	icon,
	size = "small",
	style,
	ghost,
	...props
}: IconButtonProps) {
	const [isPressed, setIsPressed] = useState(false);

	const sizeMap = {
		small: theme.spacing.s,
		medium: theme.spacing.m,
		large: theme.spacing.l,
	};

	return (
		<Pressable
			onPressIn={() => setIsPressed(true)}
			onPressOut={() => setIsPressed(false)}
			className={clsx(
				"p-3 rounded-full items-center justify-center bg-gray-100 dark:bg-gray-900",
				{ "bg-transparent": ghost, "opacity-80": isPressed },
			)}
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			style={style as any}
			{...props}
		>
			<Icon
				className="text-white dark:text-gray-200"
				name={icon}
				size={sizeMap[size]}
			/>
		</Pressable>
	);
}

export default styled(IconButton);
