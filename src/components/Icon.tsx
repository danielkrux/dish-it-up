import FeatherIcons from "@expo/vector-icons/Feather";
import { StyleProp, ViewStyle } from "react-native";
import Logo from "~/assets/logo.svg";
import theme from "../theme";

export type IconName = keyof typeof FeatherIcons.glyphMap | "logo";

export type IconProps = {
	name: IconName;
	color?: string;
	size: number;
	light?: boolean;
	style?: StyleProp<ViewStyle>;
	className?: string;
};

export default function Icon({
	name,
	size,
	color,
	light,
	style,
	className,
}: IconProps) {
	const c = color ? color : light ? theme.colors.white : theme.colors.text;

	if (name === "logo")
		return (
			<Logo width={size} height={size} style={style} className={className} />
		);

	return (
		<FeatherIcons
			className={className}
			name={name}
			color={c}
			size={size}
			style={style}
		/>
	);
}
