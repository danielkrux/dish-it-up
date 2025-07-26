import { Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import CookModeProvider from "~/features/cook-mode/CookModeContext";

function CookLayout() {
  return (
    <CookModeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="select-recipe"
          options={{
            presentation: "modal",
            headerShown: false,
            animation: Platform.select({
              android: "fade_from_bottom",
              ios: "default",
            }),
          }}
        />
        <Stack.Screen name="[ids]" />
      </Stack>
    </CookModeProvider>
  );
}

export default CookLayout;
