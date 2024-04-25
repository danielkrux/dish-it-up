import "react-native-get-random-values";
import "react-native-url-polyfill/auto";

import { JosefinSans_700Bold, useFonts } from "@expo-google-fonts/josefin-sans";
import {
  NotoSans_700Bold,
  NotoSans_500Medium,
} from "@expo-google-fonts/noto-sans";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalProvider } from "@gorhom/portal";
import { ThemeProvider } from "@react-navigation/native";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

import * as NavigationBar from "expo-navigation-bar";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { NativeWindStyleSheet } from "nativewind";
import { useEffect } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import Toast from "react-native-toast-message";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useReactQueryDevTools } from "@dev-plugins/react-query";

import { queryClient, setQueryClientFocus } from "../clients/reactQuery";
import { initSupabase } from "../clients/supabase";
import { useAppState } from "../hooks/useAppState";
import { useOnlineManager } from "../hooks/useOnlineManager";

import AuthProvider from "~/AuthContext";
import toastConfig from "~/configs/toastConfig";
import { useThemeConfig } from "~/hooks/useThemeConfig";
import { colors } from "~/theme";
import { clientPersister } from "~/utils/storage";

export const supabase = initSupabase();

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function Root() {
  useReactQueryDevTools(queryClient);

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
                  <Slot />
                  <Toast config={toastConfig} topOffset={0} />
                </AuthProvider>
              </BottomSheetModalProvider>
            </KeyboardProvider>
          </PortalProvider>
        </PersistQueryClientProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
