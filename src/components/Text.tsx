import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from "react-native";
import theme from "../theme";
import Animated from "react-native-reanimated";
import createClassComponent from "../utils/createClassComponent";

export type TextProps = {
  type?: "header" | "body";
} & RNTextProps;

export default function Text({ type = "body", style, ...props }: TextProps) {
  return <RNText style={[styles.text, styles[type], style]} {...props} />;
}

export const AnimatedText = Animated.createAnimatedComponent(
  createClassComponent(Text)
);

const styles = StyleSheet.create({
  text: {},
  body: {
    fontSize: 16,
    lineHeight: 16 * 1.5,
    fontFamily: "InterRegular",
  },
  header: {
    fontSize: theme.fontSize.xl,
    fontFamily: "JoseFinSansBold",
  },
});
