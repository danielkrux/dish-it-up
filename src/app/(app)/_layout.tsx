import { Redirect, Stack } from "expo-router";

import { Platform } from "react-native";
import useAuth from "~/hooks/useAuth";
import { useThemeConfig } from "~/hooks/useThemeConfig";

function Layout() {
	const theme = useThemeConfig();
	const { session, isLoading } = useAuth();

	if (isLoading) {
		return null;
	}

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
				name="recipe/[id]/cook"
				options={{
					presentation: "containedTransparentModal",
					headerShown: false,
					animation: Platform.select({
						android: "fade_from_bottom",
						ios: "default",
					}),
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
				name="meal-planner/select-recipe"
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
				name="meal-planner/grocery-list"
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
