import FeatherIcons from "@expo/vector-icons/Feather";

export type IconProps = {
  name: keyof typeof FeatherIcons.glyphMap;
  color: string;
  size: number;
};

export default function Icon({ name, color, size }: IconProps) {
  return <FeatherIcons name={name} color={color} size={size} />;
}
