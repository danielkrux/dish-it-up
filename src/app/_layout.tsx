import "react-native-url-polyfill/auto";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import {
  useFonts,
  JosefinSans_700Bold,
  NotoSans_400Regular,
} from "@expo-google-fonts/dev";
import { ThemeProvider, DefaultTheme, Theme } from "@react-navigation/native";
import { Platform } from "react-native";
import { PortalProvider } from "@gorhom/portal";

import { onAppStateChange, queryClient } from "../clients/reactQuery";
import { initSupabase } from "../clients/supabase";
import { useOnlineManager } from "../hooks/useOnlineManager";
import { useAppState } from "../hooks/useAppState";

import theme from "../theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
  useAppState(onAppStateChange);

  const [loaded] = useFonts({
    Heading: JosefinSans_700Bold,
    Body: NotoSans_400Regular,
  });

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={NavigationTheme}>
        <PortalProvider>
          <QueryClientProvider client={queryClient}>
            <Stack
              screenOptions={{
                headerShadowVisible: false,
                headerTintColor: theme.colors.text,
                animation: Platform.select({
                  android: "fade",
                  ios: "default",
                }),
              }}
            >
              <Stack.Screen
                name="index"
                options={{
                  headerShown: true,
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
            </Stack>
          </QueryClientProvider>
        </PortalProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default Layout;
