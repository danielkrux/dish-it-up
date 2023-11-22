import "react-native-get-random-values";

import {
  JosefinSans_700Bold,
  NotoSans_400Regular,
  NotoSans_500Medium,
  NotoSans_700Bold,
  useFonts,
} from "@expo-google-fonts/dev";
import { PortalProvider } from "@gorhom/portal";
import { DefaultTheme, Theme, ThemeProvider } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack, router } from "expo-router";
import { Platform, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-url-polyfill/auto";

import { onAppStateChange, queryClient } from "../clients/reactQuery";
import { initSupabase } from "../clients/supabase";
import { useAppState } from "../hooks/useAppState";
import { useOnlineManager } from "../hooks/useOnlineManager";

import theme from "../theme";
import IconButton from "../components/IconButton";

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
    Body: NotoSans_500Medium,
    BodyBold: NotoSans_700Bold,
  });

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={NavigationTheme}>
        <PortalProvider>
          <QueryClientProvider client={queryClient}>
            <StatusBar barStyle="dark-content" />
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
                name="(home)"
                options={{
                  headerShown: true,
                  headerTitle: "",
                  headerRight: () => (
                    <IconButton
                      onPress={() => router.push("/settings/")}
                      icon="settings"
                      size="medium"
                    />
                  ),
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
            </Stack>
          </QueryClientProvider>
        </PortalProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default Layout;
