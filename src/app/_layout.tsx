import {
  JosefinSans_700Bold,
  NotoSans_400Regular,
  useFonts,
} from "@expo-google-fonts/dev";
import { PortalProvider } from "@gorhom/portal";
import { DefaultTheme, Theme, ThemeProvider } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-url-polyfill/auto";

import { onAppStateChange, queryClient } from "../clients/reactQuery";
import { initSupabase } from "../clients/supabase";
import { useAppState } from "../hooks/useAppState";
import { useOnlineManager } from "../hooks/useOnlineManager";

import theme from "../theme";

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
