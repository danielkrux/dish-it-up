import { StyleProp, ViewStyle, useColorScheme } from "react-native";
import { icons } from "lucide-react-native";
import Logo from "~/assets/logo.svg";
import theme from "../theme";
import { styled } from "nativewind";

export type IconName = keyof typeof icons | "logo";

export type IconProps = {
  name: IconName;
  color?: string;
  size: number;
  light?: boolean;
  style?: StyleProp<ViewStyle>;
};

function Icon({ name, size, color, light, style }: IconProps) {
  const colorScheme = useColorScheme();

  if (name === "logo") return <Logo width={size} height={size} style={style} />;

  // @ts-ignore
  const LucideIcon = icons[name as string];

  if (!LucideIcon) return null;

  const isLightIcon =
    typeof light === "undefined" ? colorScheme === "light" : light;

  const c = color
    ? color
    : isLightIcon
    ? theme.colors.black
    : theme.colors.white;

  return <LucideIcon color={c} size={size} style={style} />;
}

export default styled(Icon);
