import { Stack } from "expo-router";
import { Platform } from "react-native";
import theme from "~/theme";

function GroceryListLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShadowVisible: false,
          headerTitle: "Meal Planner",
          title: "Meal Planner",
          headerTitleStyle: {
            fontFamily: "Heading",
            fontSize: theme.fontSize.xxl,
            fontWeight: "bold",
          },
        }}
      />
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
    </Stack>
  );
}

export default GroceryListLayout;
