import { Stack } from "expo-router";
import { Platform } from "react-native";
import { useThemeConfig } from "~/hooks/useThemeConfig";

export default function AddLayout() {
	const theme = useThemeConfig();
	return (
		<Stack
			screenOptions={{
				headerTintColor: theme.colors.text,
				animation: Platform.select({
					android: "none",
					ios: "default",
				}),
			}}
		>
			<Stack.Screen name="index" options={{ title: "Add recipe" }} />
			<Stack.Screen name="[url]" options={{ headerShown: false }} />
		</Stack>
	);
}
