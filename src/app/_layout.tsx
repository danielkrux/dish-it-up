import "react-native-url-polyfill/auto";
import { QueryClientProvider } from "@tanstack/react-query";

import { onAppStateChange, queryClient } from "../clients/reactQuery";
import { initSupabase } from "../clients/supabase";
import { useOnlineManager } from "../hooks/useOnlineManager";
import { useAppState } from "../hooks/useAppState";

import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";

import { withLayoutContext } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const { Navigator } = createStackNavigator();

export const Stack = withLayoutContext<
  StackNavigationOptions,
  typeof Navigator
>(Navigator);

export const supabase = initSupabase();

const Layout = () => {
  useOnlineManager();
  useAppState(onAppStateChange);

  // const [loaded] = useFonts({
  //   Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
  //   InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  // });

  // if (!loaded) {
  //   return null;
  // }

  return (
    <BottomSheetModalProvider>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </QueryClientProvider>
    </BottomSheetModalProvider>
  );
};

export default Layout;
