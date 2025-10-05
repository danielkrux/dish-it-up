import { TabRouter } from "@react-navigation/native";
import { Link, Navigator, Slot, usePathname } from "expo-router";
import { NativeTabs, Icon as TabIcon } from "expo-router/unstable-native-tabs";

import * as Updates from "expo-updates";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

import Icon, { type IconName } from "~/components/Icon";
import { init } from "~/features/app/app.utils";
import Header from "~/features/home/components/Header.web";
import { useAppState } from "~/hooks/useAppState";
import { useThemeConfig } from "~/hooks/useThemeConfig";
import { colors, isDesktop, isWeb } from "~/theme";
import { cn } from "~/utils/tailwind";

const links: {
  title: string;
  navLabel: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  href: any;
  icon: IconName;
}[] = [
  { title: "", navLabel: "Home", href: "/", icon: "BookText" },
  {
    title: "Groceries",
    navLabel: "Groceries",
    href: "/grocery-list",
    icon: "ShoppingCart",
  },
  {
    title: "Plan your meals",
    navLabel: "Meal Planner",
    href: "/meal-planner",
    icon: "BookOpen",
  },
  { title: "Account", navLabel: "Account", href: "/account", icon: "User" },
  {
    title: "Settings",
    navLabel: "Settings",
    href: "/settings",
    icon: "Settings",
  },
];

function Home() {
  const currentTheme = useThemeConfig();
  const path = usePathname();
  const { isUpdateAvailable, isUpdatePending } = Updates.useUpdates();

  useEffect(() => {
    init();
  }, []);

  useAppState((state) => {
    if (process.env.NODE_ENV === "development") return;
    if (state === "active") {
      Updates.checkForUpdateAsync();
    }
  });

  useEffect(() => {
    if (isUpdateAvailable) {
      Updates.fetchUpdateAsync();
    }
  }, [isUpdateAvailable]);

  useEffect(() => {
    if (isUpdatePending) {
      Toast.show({
        type: "info",
        text1: "Update available",
        text2: "A new version is available, press to update",
        onPress: Updates.reloadAsync,
        autoHide: false,
      });
    }
  }, [isUpdatePending]);

  if (isWeb && isDesktop) {
    return (
      <Navigator router={TabRouter}>
        <div className="grid grid-cols-dashboard grid-rows-dashboard">
          <aside className="w-[270px] border-r border-r-gray-100 dark:border-r-gray-800 pr-10 pt-10">
            <div className="flex flex-col items-center gap-4">
              <Icon name="logo" size={120} />
              <h1 className="font-display text-center text-4xl dark:text-white">
                Dish It Up
              </h1>
            </div>
            <nav className="flex flex-col mt-10 gap-1">
              {links.map((l) => {
                const isLast = links.indexOf(l) === links.length - 1;

                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={cn(
                      "flex items-center gap-4 py-3 rounded-lg px-4 font-body-bold hover:bg-gray-100 transition-colors dark:text-white dark:hover:bg-gray-800 ",
                      {
                        "bg-acapulco-400 text-white hover:bg-acapulco-400 dark:hover:bg-acapulco-400":
                          path === l.href,
                        "mt-auto": isLast,
                      }
                    )}
                  >
                    <Icon
                      name={l.icon as IconName}
                      className="text-current"
                      size={20}
                    />
                    <span>{l.navLabel}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
          <div className="flex h-full flex-1 flex-col">
            <Header
              title={links.find((l) => l.href === path)?.title}
              className="flex-shrink-0 pt-10"
            />
            <Slot />
          </div>
        </div>
      </Navigator>
    );
  }

  return (
    <NativeTabs iconColor={colors.primary[400]}>
      <NativeTabs.Trigger name="recipes" options={{ title: "Recipes" }}>
        <TabIcon sf="house.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="grocery-list" options={{ title: "Groceries" }}>
        <TabIcon sf="cart" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger
        name="meal-planner"
        options={{ title: "Meal Planner" }}
      >
        <TabIcon sf="book" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="account" options={{ title: "Account" }}>
        <TabIcon sf="person.circle" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

export default Home;
