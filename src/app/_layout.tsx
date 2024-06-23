import "react-native-get-random-values";
import "react-native-url-polyfill/auto";

import { JosefinSans_700Bold, useFonts } from "@expo-google-fonts/josefin-sans";
import {
  NotoSans_500Medium,
  NotoSans_700Bold,
} from "@expo-google-fonts/noto-sans";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalProvider } from "@gorhom/portal";
import { ThemeProvider } from "@react-navigation/native";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import * as NavigationBar from "expo-navigation-bar";
import { Slot } from "expo-router";
import Head from "expo-router/head";
import { StatusBar } from "expo-status-bar";
import { cssInterop } from "nativewind";
import { useEffect } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import Toast from "react-native-toast-message";
import AuthProvider from "~/AuthContext";
import Logo from "~/assets/logo.svg";
import Modal from "~/components/Modal";
import toastConfig from "~/configs/toastConfig";
import { useThemeConfig } from "~/hooks/useThemeConfig";
import { colors, isWeb } from "~/theme";
import { clientPersister } from "~/utils/storage";
import { queryClient, setQueryClientFocus } from "../clients/reactQuery";
import { initSupabase } from "../clients/supabase";
import { useAppState } from "../hooks/useAppState";
import { useOnlineManager } from "../hooks/useOnlineManager";
import "../../styles.css";

export const supabase = initSupabase();

cssInterop(Image, { className: "style" });
cssInterop(Logo, {
  className: "style",
});
cssInterop(LinearGradient, { className: "style" });

export default function Root() {
  // useReactQueryDevTools(queryClient);

  const theme = useThemeConfig();
  useOnlineManager();

  useEffect(() => {
    if (Platform.OS !== "android") return;
    NavigationBar.setBackgroundColorAsync(
      theme.dark ? colors.gray[950] : colors.white
    );
  }, [theme.dark]);

  useAppState(async (state) => {
    setQueryClientFocus(state);
  });

  useAppState(async (state) => {
    if (state === "active") {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });

  const [loaded] = useFonts({
    Heading: JosefinSans_700Bold,
    Body: NotoSans_500Medium,
    BodyBold: NotoSans_700Bold,
  });

  if (!loaded) {
    return null;
  }

  if (isWeb) {
    document
      ?.querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", "#123456");
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={theme}>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister: clientPersister }}
        >
          <PortalProvider>
            <KeyboardProvider>
              <BottomSheetModalProvider>
                <AuthProvider>
                  <StatusBar
                    backgroundColor={
                      theme.dark ? colors.gray[950] : colors.white
                    }
                    style="auto"
                  />
                  <Head>
                    <meta property="expo:handoff" content="true" />
                    <meta name="apple-itunes-app" content="app-id=6474765614" />
                    <link rel="manifest" href="/manifest.json" />
                  </Head>
                  <Slot />
                  <Toast config={toastConfig} topOffset={0} />
                  <Modal />
                </AuthProvider>
              </BottomSheetModalProvider>
            </KeyboardProvider>
          </PortalProvider>
        </PersistQueryClientProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
