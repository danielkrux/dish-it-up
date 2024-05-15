import { useColorScheme } from "react-native";
import { icons } from "lucide-react-native";

import Logo from "~/assets/logo.svg";
import theme from "../theme";
import { cn } from "~/utils/tailwind";
import { cssInterop } from "nativewind";

export type IconName = keyof typeof icons | "logo";

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
  cssInterop(LucideIcon, { className: "style" });

  const isLightIcon =
    typeof light === "undefined" ? colorScheme === "dark" : light;

  const c = color
    ? color
    : isLightIcon
    ? theme.colors.white
    : theme.colors.black;

  return (
    <LucideIcon
      size={size}
      className={cn("dark:text-white text-gray-950", className)}
    />
  );
}

export default Icon;
