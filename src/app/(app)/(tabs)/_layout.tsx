import { Tabs, useRouter } from "expo-router";
import { useEffect } from "react";

import Icon from "~/components/Icon";
import IconButton from "~/components/IconButton";
import { init } from "~/features/app/app.utils";
import HomeProvider from "~/features/home/HomeContext";
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

  return (
    <HomeProvider>
      <Tabs
        screenOptions={{
          headerShown: true,
          tabBarActiveTintColor: currentTheme.colors.primary,
          tabBarInactiveTintColor: currentTheme.colors.text,
          tabBarStyle: {
            borderTopWidth: 0,
          },
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
    </HomeProvider>
  );
}

export default Home;
