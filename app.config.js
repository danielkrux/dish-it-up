const DOMAIN = "dish-it-up";

const URL = `${DOMAIN}.app`;

/** @type {import('expo/config').ExpoConfig} */
module.exports = {
  name: "Dish It Up",
  slug: "dish-it-up",
  version: "1.0.3",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
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
    "./modules/react-native-ocr/app.plugin.js",
    [
      "expo-share-intent",
      {
        iosActivationRules: {
          NSExtensionActivationSupportsWebURLWithMaxCount: 1,
          NSExtensionActivationSupportsWebPageWithMaxCount: 1,
        },
        androidIntentFilters: ["text/*", "image/*"],
      },
    ],
    [
      "expo-router",
      {
        headOrigin: `https://${URL}`,
      },
    ],
    [
      "expo-build-properties",
      {
        android: {
          compileSdkVersion: 34,
          targetSdkVersion: 33,
          minSdkVersion: 23,
          buildToolsVersion: "33.0.0",
          kotlinVersion: "1.8.0",
        },
      },
    ],
    "./src/plugins/withShareExtensionOnlyActiveArchFix.ts",
  ],
  extra: {
    ios: {
      teamId: "J4U764FR4Z",
    },
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
