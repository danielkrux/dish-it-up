import { Redirect, Stack } from "expo-router";

import { Platform } from "react-native";
import useAuth from "~/hooks/useAuth";
import theme from "../../theme";

function Layout() {
	const { session } = useAuth();

	if (!session) {
		return <Redirect href="/sign-in" />;
	}

	return (
		<Stack
			screenOptions={{
				headerShadowVisible: false,
				headerTintColor: theme.colors.text,
			}}
		>
			<Stack.Screen
				name="(tabs)"
				options={{
					headerShown: false,
					headerTitle: "",
				}}
			/>
			<Stack.Screen
				name="recipe/add"
				options={{
					presentation: "modal",
					headerShown: false,
					animation: Platform.select({
						android: "fade_from_bottom",
						ios: "default",
					}),
				}}
			/>
			<Stack.Screen
				name="recipe/[id]/select-groceries"
				options={{
					presentation: "modal",
					headerShown: false,
					animation: Platform.select({
						android: "fade_from_bottom",
						ios: "default",
					}),
				}}
			/>
			<Stack.Screen
				name="select-recipe"
				options={{
					presentation: "modal",
					headerShown: false,
					animation: Platform.select({
						android: "fade_from_bottom",
						ios: "default",
					}),
				}}
			/>
			<Stack.Screen
				name="settings/index"
				options={{
					title: "Settings",
				}}
			/>
			<Stack.Screen
				name="settings/categories"
				options={{
					title: "Manage Categories",
				}}
			/>
		</Stack>
	);
}

export default Layout;