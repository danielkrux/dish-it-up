import { Stack } from "expo-router";
import { Platform } from "react-native";
import theme from "~/theme";

export default function AddLayout() {
	return (
		<Stack
			screenOptions={{
				headerTintColor: theme.colors.secondary,
				animation: Platform.select({
					android: "none",
					ios: "default",
				}),
			}}
		>
			<Stack.Screen name="index" options={{ title: "Add recipe" }} />
			<Stack.Screen name="[url]" options={{ headerShown: false }} />
			<Stack.Screen name="custom" options={{ title: "Custom recipe" }} />
		</Stack>
	);
}
