import "react-native-url-polyfill/auto";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack, withLayoutContext } from "expo-router";
import {
  useFonts,
  JosefinSans_700Bold,
  Inter_500Medium,
} from "@expo-google-fonts/dev";

import { onAppStateChange, queryClient } from "../clients/reactQuery";
import { initSupabase } from "../clients/supabase";
import { useOnlineManager } from "../hooks/useOnlineManager";
import { useAppState } from "../hooks/useAppState";

import { ThemeProvider, DefaultTheme, Theme } from "@react-navigation/native";
import theme from "../theme";
import { Platform } from "react-native";

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
    JoseFinSansBold: JosefinSans_700Bold,
    InterRegular: Inter_500Medium,
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={NavigationTheme}>
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
    </ThemeProvider>
  );
};

export default Layout;
