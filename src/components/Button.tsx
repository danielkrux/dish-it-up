import clsx from "clsx";
import { ActivityIndicator, Pressable, PressableProps } from "react-native";
import theme from "../theme";
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
					"bg-transparent": variant === "ghost",
					"py-3 self-start": size === "small",
					"flex-row g-2": icon,
					"opacity-25": disabled,
				},
			)}
			disabled={disabled}
			{...props}
		>
			{icon && (
				<Icon
					className={clsx("text-white", { "": variant === "ghost" })}
					name={icon}
					size={16}
				/>
			)}
			{!loading ? (
				<Text
					className={clsx("font-bold text-base", {
						"text-white": variant === "primary",
						"text-sm": size === "small",
					})}
				>
					{children}
				</Text>
			) : (
				<ActivityIndicator
					className="my-[2]"
					color={variant === "primary" ? "#fff" : theme.colors.secondary}
				/>
			)}
		</Pressable>
	);
}
