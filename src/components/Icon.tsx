import theme from "../theme";
import FeatherIcons from "@expo/vector-icons/Feather";

export type IconName = keyof typeof FeatherIcons.glyphMap;

export type IconProps = {
  name: IconName;
  color?: string;
  size: number;
  light?: boolean;
};

export default function Icon({ name, size, color, light }: IconProps) {
  const c = color ? color : light ? theme.colors.white : theme.colors.text;
  return <FeatherIcons name={name} color={c} size={size} />;
}
