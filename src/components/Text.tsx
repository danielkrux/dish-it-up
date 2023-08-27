import theme from "../theme";
import createClassComponent from "../utils/createClassComponent";
import {
  StyleSheet,
  Text as RNText,
  TextProps as RNTextProps,
} from "react-native";
import Animated from "react-native-reanimated";

export type TextProps = {
  type?: "header" | "body" | "bodyBold";
  size?: "xl" | "l" | "m" | "s" | "xs";
  light?: boolean;
} & RNTextProps;

export default function Text({
  type = "body",
  size,
  style,
  ...props
}: TextProps) {
  const color = props.light ? theme.colors.textLight : theme.colors.text;
  const sizeStyle = size
    ? styles[size]
    : type === "header"
    ? styles["xxl"]
    : styles["m"];
  return (
    <RNText style={[styles[type], sizeStyle, { color }, style]} {...props} />
  );
}

export const AnimatedText = Animated.createAnimatedComponent(
  createClassComponent(Text)
);

const styles = StyleSheet.create({
  body: {
    fontFamily: "Body",
  },
  bodyBold: {
    fontFamily: "BodyBold",
  },
  header: {
    fontFamily: "Heading",
  },
  xs: {
    fontSize: theme.fontSize.xs,
    lineHeight: theme.fontSize.xs * 1.5,
  },
  s: {
    fontSize: theme.fontSize.s,
    lineHeight: theme.fontSize.s * 1.5,
  },
  m: {
    fontSize: theme.fontSize.m,
    lineHeight: theme.fontSize.m * 1.5,
  },
  l: {
    fontSize: theme.fontSize.l,
    lineHeight: theme.fontSize.l * 1.5,
  },
  xl: {
    fontSize: theme.fontSize.xl,
    lineHeight: theme.fontSize.xl * 1.2,
  },
  xxl: {
    fontSize: theme.fontSize.xxl,
    lineHeight: theme.fontSize.xxl * 1.2,
  },
});
