import FeatherIcons from "@expo/vector-icons/Feather";
import theme from "../theme";

export type IconName = keyof typeof FeatherIcons.glyphMap;

export type IconProps = {
  name: IconName;
  color: string;
  size: number;
  light?: boolean;
};

export default function Icon({ name, size, light }: IconProps) {
  const color = light ? theme.colors.white : theme.colors.text;
  return <FeatherIcons name={name} color={color} size={size} />;
}
