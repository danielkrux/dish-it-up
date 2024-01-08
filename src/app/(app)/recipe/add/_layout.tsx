import { Stack } from "expo-router";
import { Platform } from "react-native";
import { useThemeConfig } from "~/hooks/useThemeConfig";

export default function AddLayout() {
	const theme = useThemeConfig();
	return (
		<Stack
			screenOptions={{
				headerTintColor: theme.colors.text,
				headerShadowVisible: false,
				animation: Platform.select({
					android: "none",
					ios: "default",
				}),
			}}
		>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="[url]" options={{ headerShown: false }} />
		</Stack>
	);
}
