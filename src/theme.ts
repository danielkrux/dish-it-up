import { Dimensions } from "react-native";

export const pallettes = {
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
