import { Dimensions, Platform } from "react-native";

export const colors = {
  white: "#ffffff",
  primary: {
    50: "#f4f9f7",
    100: "#daede5",
    200: "#b5dacb",
    300: "#89bfac",
    400: "#68a691",
    500: "#468671",
    600: "#366b5b",
    700: "#2e574b",
    800: "#28473e",
    900: "#253c35",
    950: "#11221e",
  } as const,
  gray: {
    50: "#f7f8f7",
    100: "#eef0f0",
    200: "#dadddc",
    300: "#a7aeac",
    400: "#949c99",
    500: "#77807e",
    600: "#606967",
    700: "#4f5553",
    800: "#434947",
    900: "#3b3f3e",
    950: "#272a29",
  } as const,
  black: {
    900: "#000000",
    800: "#1C1C1C",
    700: "#383838",
    600: "#555555",
    500: "#717171",
    400: "#8D8D8D",
    300: "#AAAAAA",
    200: "#C6C6C6",
    100: "#F4F4F4",
  } as const,
  red: {
    900: "#4A0000",
    800: "#660000",
    700: "#800000",
    600: "#9B0000",
    500: "#B60000",
    400: "#D20000",
    300: "#ED0000",
    200: "#FF1C1C",
    100: "#FF3838",
  },
} as const;

export const SCREEN_WIDTH = Dimensions.get("window").width;
export const SCREEN_HEIGHT = Dimensions.get("window").height;

export const isTablet = SCREEN_WIDTH > 600;
export const isWeb = Platform.OS === "web";

export default {
  colors: {
    primary: "#BFCFBC",
    secondary: "#30362F",
    black: "#15140F",
    white: "#FFFFFF",
    background: "#F1F1F1",
    text: "#15140F",
    textMuted: "#555555",
    textLight: "#F1F1F1",
  } as const,
  spacing: {
    xs: 8,
    s: 12,
    m: 16,
    l: 20,
    xl: 24,
  } as const,
  fontSize: {
    xs: 10,
    s: 12,
    m: 14,
    l: 16,
    xl: 20,
    xxl: 30,
  } as const,
};
