import "react-native-get-random-values";
import "react-native-url-polyfill/auto";

import {
	JosefinSans_700Bold,
	NotoSans_500Medium,
	NotoSans_700Bold,
	useFonts,
} from "@expo-google-fonts/dev";
import { PortalProvider } from "@gorhom/portal";
import { DefaultTheme, Theme, ThemeProvider } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";
import { Platform, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { queryClient, setQueryClientFocus } from "../clients/reactQuery";
import { initSupabase } from "../clients/supabase";
import { useAppState } from "../hooks/useAppState";
import { useOnlineManager } from "../hooks/useOnlineManager";

import theme from "../theme";

NativeWindStyleSheet.setOutput({
	default: "native",
});

export const supabase = initSupabase();

const NavigationTheme: Theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: theme.colors.white,
	},
};

const Layout = () => {
	useOnlineManager();

	useAppState(async (state) => {
		setQueryClientFocus(state);
	});

	const [loaded] = useFonts({
		Heading: JosefinSans_700Bold,
		Body: NotoSans_500Medium,
		BodyBold: NotoSans_700Bold,
	});

	if (!loaded) {
		return null;
	}

	return (
		<GestureHandlerRootView className="flex-1">
			<ThemeProvider value={NavigationTheme}>
				<QueryClientProvider client={queryClient}>
					<PortalProvider>
						<StatusBar barStyle="dark-content" />
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
						</Stack>
					</PortalProvider>
				</QueryClientProvider>
			</ThemeProvider>
		</GestureHandlerRootView>
	);
};

export default Layout;
