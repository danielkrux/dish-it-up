import clsx from "clsx";
import { ActivityIndicator, Pressable, PressableProps } from "react-native";
import theme, { colors } from "../theme";
import Icon, { IconProps } from "./Icon";
import Text from "./Text";

export type ButtonProps = {
	size?: "small" | "large";
	variant?: "primary" | "secondary" | "ghost";
	children: string;
	loading?: boolean;
	icon?: IconProps["name"];
} & PressableProps;

export default function Button({
	variant = "primary",
	size = "small",
	disabled,
	loading,
	children,
	style,
	icon,
	...props
}: ButtonProps) {
	return (
		<Pressable
			style={style}
			className={clsx(
				"rounded-lg items-center justify-center py-4 px-4 self-stretch bg-primary",
				{
					"opacity-90": loading,
					"bg-acapulco-300/20": variant === "secondary",
					"bg-transparent": variant === "ghost",
					"py-1.5 self-start": size === "small",
					"flex-row g-2": icon,
					"opacity-25": disabled,
				},
			)}
			disabled={disabled}
			{...props}
		>
			{icon && (
				<Icon
					className={clsx("text-white", {
						"text-gray-950 dark:text-white": variant === "ghost",
					})}
					name={icon}
					size={16}
				/>
			)}
			{!loading ? (
				<Text
					className={clsx("text-base font-body-bold text-white", {
						"text-acapulco-300": variant === "secondary",
						"text-gray-800 dark:text-white": variant === "ghost",
						"text-sm": size === "small",
					})}
				>
					{children}
				</Text>
			) : (
				<ActivityIndicator
					className="my-[2] px-2"
					size="small"
					color={
						variant === "primary"
							? "#fff"
							: variant === "secondary"
							  ? colors.primary[400]
							  : theme.colors.secondary
					}
				/>
			)}
		</Pressable>
	);
}
