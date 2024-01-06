import "react-native-get-random-values";
import "react-native-url-polyfill/auto";

import {
	JosefinSans_700Bold,
	NotoSans_500Medium,
	NotoSans_700Bold,
	useFonts,
} from "@expo-google-fonts/dev";
import { PortalProvider } from "@gorhom/portal";
import { ThemeProvider } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { NativeWindStyleSheet } from "nativewind";
import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";

import { queryClient, setQueryClientFocus } from "../clients/reactQuery";
import { initSupabase } from "../clients/supabase";
import { useAppState } from "../hooks/useAppState";
import { useOnlineManager } from "../hooks/useOnlineManager";

import AuthProvider from "~/AuthContext";
import toastConfig from "~/configs/toastConfig";
import { useThemeConfig } from "~/hooks/useThemeConfig";

export const supabase = initSupabase();

NativeWindStyleSheet.setOutput({
	default: "native",
});

export default function Root() {
	const theme = useThemeConfig();
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
		<ThemeProvider value={theme}>
			<QueryClientProvider client={queryClient}>
				<PortalProvider>
					<AuthProvider>
						<StatusBar barStyle="default" />
						<Slot />
						<Toast config={toastConfig} topOffset={0} />
					</AuthProvider>
				</PortalProvider>
			</QueryClientProvider>
		</ThemeProvider>
	);
}
