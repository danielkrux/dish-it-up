import { Slot, Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import { Platform, View } from "react-native";

import Icon from "~/components/Icon";
import IconButton from "~/components/IconButton";
import Text from "~/components/Text";
import { init } from "~/features/app/app.utils";
import { useHandleUrlShare } from "~/features/home/hooks/useHandleUrlShare";
import { useThemeConfig } from "~/hooks/useThemeConfig";
import theme, { isTablet } from "~/theme";

function Home() {
  const currentTheme = useThemeConfig();
  const router = useRouter();

  useEffect(() => {
    init();
  }, []);

  useHandleUrlShare();

  if (Platform.OS === "web") {
    return (
      <div className="grid [grid-template-columns: 1fr 4fr]">
        <aside>
          <Text type="header" size="2xl">
            Dish It Up
          </Text>
        </aside>
        <div style={{ flex: 1 }}>
          <Slot />
        </div>
      </div>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: currentTheme.colors.primary,
        tabBarInactiveTintColor: currentTheme.colors.text,
        headerTitle: "",
        headerShadowVisible: false,
        headerRightContainerStyle: {
          paddingRight: theme.spacing.m,
        },
        headerTitleAlign: "left",
        headerTitleContainerStyle: {
          paddingLeft: isTablet ? theme.spacing.m : 0,
        },
        headerTitleStyle: {
          fontFamily: "Heading",
          fontSize: theme.fontSize.xxl,
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          headerTitle: "Get cooking today!",
          tabBarIcon: ({ color }) => (
            <Icon name="BookText" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="grocery-list"
        options={{
          title: "Groceries",
          headerTitle: "Groceries",
          tabBarIcon: ({ color }) => (
            <Icon name="ShoppingCart" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="meal-planner"
        options={{
          title: "Meal Planner",
          headerTitle: "Plan your meals",
          tabBarIcon: ({ color }) => (
            <Icon name="BookOpen" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          headerTitle: "Account",
          tabBarIcon: ({ color }) => (
            <Icon name="User" size={24} color={color} />
          ),
          headerRight: () => (
            <IconButton
              onPress={() => router.push("/settings/")}
              icon="Settings"
              size="medium"
            />
          ),
        }}
      />
    </Tabs>
  );
}

export default Home;
