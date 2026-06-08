import {
  type Theme,
  DarkTheme as _DarkTheme,
  DefaultTheme,
} from "expo-router/react-navigation";
import { useColorScheme as useNativeWindColorScheme } from "nativewind";
import { useEffect } from "react";
import { AppState, useColorScheme } from "react-native";

import { colors } from "~/theme";

const DarkTheme: Theme = {
  ..._DarkTheme,
  colors: {
    ..._DarkTheme.colors,
    primary: colors.primary[200],
    background: colors.gray[950],
    text: colors.gray[100],
    border: colors.gray[900],
    card: colors.gray[950],
  },
};

const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary[400],
    background: colors.white,
  },
};

export function useThemeConfig() {
  const currentColorScheme = useColorScheme();
  const { colorScheme, setColorScheme } = useNativeWindColorScheme();

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      const isActive = state === "active";
      if (!isActive) return;
      if (currentColorScheme)
        setColorScheme(currentColorScheme as "light" | "dark" | "system");
    });
    return () => subscription.remove();
  }, [currentColorScheme, setColorScheme]);

  if (colorScheme === "dark") return DarkTheme;

  return LightTheme;
}
