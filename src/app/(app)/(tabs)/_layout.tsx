import { TabRouter } from "@react-navigation/native";
import clsx from "clsx";
import { Link, Navigator, Slot, Tabs, usePathname } from "expo-router";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

import Icon, { IconName } from "~/components/Icon";
import { init } from "~/features/app/app.utils";
import Header from "~/features/home/components/Header.web";
import { useHandleUrlShare } from "~/features/home/hooks/useHandleUrlShare";
import { useThemeConfig } from "~/hooks/useThemeConfig";
import theme, { isDesktop, isTablet, isWeb } from "~/theme";

const links: {
  label: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  href: any;
  icon: IconName;
}[] = [
  { label: "Home", href: "/", icon: "BookText" },
  { label: "Groceries", href: "/grocery-list", icon: "ShoppingCart" },
  { label: "Meal Planner", href: "/meal-planner", icon: "BookOpen" },
  { label: "Account", href: "/account", icon: "User" },
];

function Home() {
  const currentTheme = useThemeConfig();
  const path = usePathname();

  useEffect(() => {
    init();
  }, []);

  useHandleUrlShare();

  if (isWeb && isDesktop) {
    return (
      <Navigator router={TabRouter}>
        <div className="grid grid-cols-dashboard grid-rows-dashboard">
          <aside className="w-[270px] border-r pr-10 pt-10">
            <h1 className="font-display text-4xl">Dish It Up</h1>
            <nav className="flex flex-1 flex-col mt-10 gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  className={twMerge(
                    clsx(
                      "flex items-center gap-4 py-3 rounded-lg px-4 font-body-bold hover:bg-gray-100 transition-colors",
                      {
                        "bg-acapulco-400 text-white hover:bg-acapulco-400":
                          path === l.href,
                      }
                    )
                  )}
                  href={l.href}
                >
                  <Icon
                    color="currentColor"
                    name={l.icon as IconName}
                    size={20}
                  />
                  <span>{l.label}</span>
                </Link>
              ))}
            </nav>
          </aside>
          <div className="flex h-full flex-1 flex-col pt-10">
            <div className="flex-shrink-0">
              <Header />
            </div>
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
