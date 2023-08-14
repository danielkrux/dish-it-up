import FeatherIcons from "@expo/vector-icons/Feather";

export type IconName = keyof typeof FeatherIcons.glyphMap;

export type IconProps = {
  name: IconName;
  color: string;
  size: number;
};

export default function Icon({ name, color, size }: IconProps) {
  return <FeatherIcons name={name} color={color} size={size} />;
}
