import { Stack } from "expo-router";
import GroceryListMenu from "~/features/grocery-list/components/GroceryListMenu";
import theme from "~/theme";

function GroceryListLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShadowVisible: false,
          headerTitle: "Groceries",
          title: "Groceries",
          headerTitleStyle: {
            fontFamily: "Heading",
            fontSize: theme.fontSize.xxl,
            fontWeight: "bold",
          },
          headerRight: () => <GroceryListMenu />,
        }}
      />
    </Stack>
  );
}

export default GroceryListLayout;
