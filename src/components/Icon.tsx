import { useColorScheme } from "react-native";
import { icons } from "lucide-react-native";
import Logo from "~/assets/logo.svg";
import theme from "../theme";
import { cssInterop } from "nativewind";

export type IconName = keyof typeof icons | "logo";

cssInterop(Logo, {
  className: "style",
});

export type IconProps = {
  name: IconName;
  color?: string;
  size?: number;
  light?: boolean;
  className?: string;
};

function Icon({ name, size = 24, color, light, className }: IconProps) {
  const colorScheme = useColorScheme();

  if (name === "logo")
    return <Logo width={size} height={size} className={className} />;

  // @ts-ignore
  const LucideIcon = icons[name as string];

  if (!LucideIcon) return null;

  const isLightIcon =
    typeof light === "undefined" ? colorScheme === "dark" : light;

  const c = color
    ? color
    : isLightIcon
    ? theme.colors.white
    : theme.colors.black;

  return <LucideIcon color={c} size={size} className={className} />;
}

export default Icon;
