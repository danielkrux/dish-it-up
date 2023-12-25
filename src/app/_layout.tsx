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
import { NativeWindStyleSheet } from "nativewind";
import { StatusBar } from "react-native";

import { queryClient, setQueryClientFocus } from "../clients/reactQuery";
import { initSupabase } from "../clients/supabase";
import { useAppState } from "../hooks/useAppState";
import { useOnlineManager } from "../hooks/useOnlineManager";

import { Slot } from "expo-router";
import AuthProvider from "~/AuthContext";
import theme from "../theme";

export const supabase = initSupabase();

NativeWindStyleSheet.setOutput({
	default: "native",
});

const NavigationTheme: Theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: theme.colors.white,
	},
};

export default function Root() {
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
		<ThemeProvider value={NavigationTheme}>
			<QueryClientProvider client={queryClient}>
				<PortalProvider>
					<AuthProvider>
						<StatusBar barStyle="dark-content" />
						<Slot />
					</AuthProvider>
				</PortalProvider>
			</QueryClientProvider>
		</ThemeProvider>
	);
}
