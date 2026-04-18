import { ExpoConfig } from "expo/config";

const DOMAIN = "dishitup";

const URL = `${DOMAIN}.app`;

export default (): ExpoConfig => ({
  name: "Dish It Up",
  slug: "dish-it-up",
  version: "1.3.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  scheme: "dishitup",
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
    buildNumber: "12",
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
    "expo-image",
    "expo-build-properties",
    "@react-native-community/datetimepicker",
    [
      "expo-router",
      {
        headOrigin: `https://${URL}`,
      },
    ],
    [
      "expo-sharing",
      {
        ios: {
          enabled: true,
          activationRule: {
            supportsWebUrlWithMaxCount: 1,
            supportsWebPageWithMaxCount: 1,
            supportsText: true,
          },
        },
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
  buildCacheProvider: "eas",
  experiments: {
    typedRoutes: true,
    tsconfigPaths: true,
    reactCompiler: true,
  },
  runtimeVersion: {
    policy: "appVersion",
  },
  updates: {
    url: "https://u.expo.dev/b56a0bb4-b7e6-4823-b7cc-048af43d7698",
  },
});
