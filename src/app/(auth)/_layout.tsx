import { Stack } from "expo-router";
import React from "react";

function AutLayout() {
  return (
    <Stack screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen
        name="sign-up/index"
        options={{ headerBackTitle: "Back to Sign In", headerTitle: "" }}
      />
      <Stack.Screen
        name="sign-up/success"
        options={{ headerBackTitle: "Back to Sign In", headerTitle: "" }}
      />
    </Stack>
  );
}

export default AutLayout;
