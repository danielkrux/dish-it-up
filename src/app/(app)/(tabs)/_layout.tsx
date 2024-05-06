import { TabRouter } from "@react-navigation/native";
import { Navigator, Slot, Tabs, useRouter } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";

import Icon from "~/components/Icon";
import ListButton from "~/components/ListButton";
import { init } from "~/features/app/app.utils";
import Header from "~/features/home/components/Header.web";
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
      <Navigator router={TabRouter}>
        <Header />
        <div className="grid grid-cols-dashboard">
          <aside className="w-60">
            <ListButton label="Home" onPress={() => router.navigate("/")} />
            <ListButton
              label="Groceries"
              onPress={() => router.navigate("/grocery-list")}
            />
            <ListButton
              label="Mealplanner"
              onPress={() => router.navigate("/meal-planner")}
            />
            <ListButton
              label="Account"
              onPress={() => router.navigate("/account")}
            />
          </aside>
          <div className="grid max-h-[calc(100vh-40px)] -mt-10">
            <Slot />
          </div>
        </div>
      </Navigator>
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
        }}
      />
    </Tabs>
  );
}

export default Home;
