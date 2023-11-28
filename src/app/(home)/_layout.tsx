import { Tabs, useRouter } from "expo-router";
import Icon from "../../components/Icon";
import theme from "../../theme";
import IconButton from "../../components/IconButton";
import ContextMenu from "../../components/ContextMenu/ContextMenu";

function Home() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: theme.colors.text,
        tabBarInactiveTintColor: theme.colors.textMuted,
        headerTitle: "",
        headerShadowVisible: false,
        headerRightContainerStyle: {
          paddingRight: theme.spacing.m,
        },
        headerTitleAlign: "left",
        headerTitleStyle: {
          fontFamily: "Heading",
          fontSize: theme.fontSize.xxl,
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: "Get cooking today!",
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="grocery-list"
        options={{
          title: "Groceries",
          headerTitle: "Groceries",
          tabBarIcon: ({ color }) => (
            <Icon name="shopping-cart" size={24} color={color} />
          ),
          headerRight: () => (
            <ContextMenu
              actions={[
                { label: "Delete all", destructive: true, icon: "trash-2" },
              ]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="meal-planner"
        options={{
          title: "Meal Planner",
          headerTitle: "Plan your meals",
          tabBarIcon: ({ color }) => (
            <Icon name="book-open" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          headerTitle: "Account",
          tabBarIcon: ({ color }) => (
            <Icon name="user" size={24} color={color} />
          ),
          headerRight: () => (
            <IconButton
              onPress={() => router.push("/settings/")}
              icon="settings"
              size="medium"
            />
          ),
        }}
      />
    </Tabs>
  );
}

export default Home;
