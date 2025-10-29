const DOMAIN = "dish-it-up";

const URL = `${DOMAIN}.app`;

/** @type {import('expo/config').ExpoConfig} */
module.exports = {
  name: "Dish It Up",
  slug: "dish-it-up",
  version: "1.0.3",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  scheme: "dish-it-up",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#68A691",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#68A691",
    },
    package: "com.danielkrux.dishitup",
    softwareKeyboardLayoutMode: "resize",
    intentFilters: [
      {
        action: "VIEW",
        autoVerify: true,
        data: [
          {
            scheme: "https",
            host: `*.${DOMAIN}`,
            pathPrefix: "/records",
          },
        ],
        category: ["BROWSABLE", "DEFAULT"],
      },
    ],
  },
  web: {
    bundler: "metro",
    favicon: "./assets/favicon.png",
  },
  ios: {
    appleTeamId: "J4U764FR4Z",
    buildNumber: "11",
    supportsTablet: true,
    bundleIdentifier: "com.danielkrux.dishitup",
    associatedDomains: [
      `applinks:${URL}`,
      `activitycontinuation:${URL}`,
      `webcredentials:${URL}`,
    ],
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  plugins: [
    "expo-font",
    "expo-asset",
    "expo-secure-store",
    [
      "expo-router",
      {
        headOrigin: `https://${URL}`,
      },
    ],
    [
      "expo-share-intent",
      {
        iosActivationRules: {
          NSExtensionActivationSupportsWebURLWithMaxCount: 1,
        },
        androidIntentFilters: ["text/*"],
      },
    ],
  ],
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "b56a0bb4-b7e6-4823-b7cc-048af43d7698",
    },
  },
  experiments: {
    typedRoutes: true,
    tsconfigPaths: true,
    reactCompiler: false,
  },
  runtimeVersion: {
    policy: "appVersion",
  },
  updates: {
    url: "https://u.expo.dev/b56a0bb4-b7e6-4823-b7cc-048af43d7698",
  },
};
