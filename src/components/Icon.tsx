import { icons } from "lucide-react-native";
import { cssInterop } from "nativewind";
import { useMemo } from "react";
import { StyleProp, ViewStyle } from "react-native";

import Logo from "~/assets/logo.svg";
import { cn } from "~/utils/tailwind";

export type IconName = keyof typeof icons | "logo";

export type IconProps = {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
  style: StyleProp<ViewStyle> & { color: string };
};

function Icon({ name, size = 24, strokeWidth, style, className }: IconProps) {
  if (name === "logo")
    return <Logo width={size} height={size} className={className} />;

  // @ts-ignore
  const LucideIcon = icons[name as string];
  useMemo(() => cssInterop(LucideIcon, { className: "style" }), [LucideIcon]);

  if (!LucideIcon) return null;

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
