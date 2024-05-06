import clsx from "clsx";
import { Text as RNText, TextProps as RNTextProps } from "react-native";
import Animated from "react-native-reanimated";

import createClassComponent from "../utils/createClassComponent";

export type TextProps = {
  type?: "header" | "body" | "bodyBold";
  size?: "2xl" | "xl" | "l" | "m" | "s" | "xs";
  light?: boolean;
} & RNTextProps;

function Text({ type = "body", size, className, ...props }: TextProps) {
  return (
    <RNText
      {...props}
      className={clsx("text-gray-950 font-body dark:text-white", className, {
        "text-3xl": size === "2xl",
        "text-xl": size === "xl",
        "text-lg": size === "l",
        "text-base": size === "m",
        "text-sm": size === "s",
        "text-xs": size === "xs",
        "font-body": type === "body",
        "font-body-bold": type === "bodyBold",
        "font-display": type === "header",
      })}
    />
  );
}

export default Text;

export const AnimatedText = Animated.createAnimatedComponent(
  createClassComponent(Text)
);
