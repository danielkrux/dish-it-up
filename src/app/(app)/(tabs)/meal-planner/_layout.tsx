import { Stack } from "expo-router";
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
    </Stack>
  );
}

export default GroceryListLayout;
