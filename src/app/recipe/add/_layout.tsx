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
    />
  );
}
