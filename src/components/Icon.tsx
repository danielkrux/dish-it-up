import FeatherIcons from "@expo/vector-icons/Feather";
import { StyleProp, ViewStyle } from "react-native";
import theme from "../theme";

export type IconName = keyof typeof FeatherIcons.glyphMap;

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
	return <FeatherIcons name={name} color={c} size={size} style={style} />;
}
