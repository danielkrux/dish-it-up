import "react-native-url-polyfill/auto";
import { QueryClientProvider } from "@tanstack/react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { withLayoutContext } from "expo-router";
import {
  useFonts,
  JosefinSans_700Bold,
  Inter_500Medium,
} from "@expo-google-fonts/dev";

import { onAppStateChange, queryClient } from "../clients/reactQuery";
import { initSupabase } from "../clients/supabase";
import { useOnlineManager } from "../hooks/useOnlineManager";
import { useAppState } from "../hooks/useAppState";

import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { ThemeProvider, DefaultTheme, Theme } from "@react-navigation/native";
import theme from "../theme";

const { Navigator } = createStackNavigator();

export const Stack = withLayoutContext<
  StackNavigationOptions,
  typeof Navigator
>(Navigator);

export const supabase = initSupabase();

const NavigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.background,
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
      <BottomSheetModalProvider>
        <QueryClientProvider client={queryClient}>
          <Stack
            screenOptions={{
              headerTitle: "",
              headerShadowVisible: false,
              headerTintColor: theme.colors.primary,
              headerStyle: {
                backgroundColor: theme.colors.background,
              },
            }}
          />
        </QueryClientProvider>
      </BottomSheetModalProvider>
    </ThemeProvider>
  );
};

export default Layout;
