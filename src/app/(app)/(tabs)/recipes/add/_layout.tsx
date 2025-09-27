import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function AddLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: Platform.select({
          android: "none",
          ios: "default",
        }),
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerTitle: "Add Recipe", headerShown: false }}
      />
      <Stack.Screen name="[url]" options={{ headerShown: false }} />
      <Stack.Screen name="scan/index" options={{ headerShown: false }} />
    </Stack>
  );
}
