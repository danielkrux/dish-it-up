import { icons } from "lucide-react-native";
import { cssInterop } from "nativewind";
import type { StyleProp, ViewStyle } from "react-native";

import Logo from "~/assets/logo.svg";
import { cn } from "~/utils/tailwind";

export type IconName = keyof typeof icons | "logo";

export type IconProps = {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: StyleProp<ViewStyle> & { color: string };
};

function Icon({ name, size = 24, strokeWidth, style, className }: IconProps) {
  // @ts-expect-error
  // eslint-disable-next-line import/namespace
  const LucideIcon = icons[name as string];

  if (name === "logo")
    return <Logo width={size} height={size} className={className} />;

  if (!LucideIcon) return null;

  cssInterop(LucideIcon, { className: "style" });

  return (
    <LucideIcon
      style={style}
      size={size}
      strokeWidth={strokeWidth}
      className={cn("dark:text-white text-gray-950", className)}
    />
  );
}

export default Icon;
