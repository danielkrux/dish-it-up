// Be sure to change this to be unique to your project.
process.env.EXPO_TUNNEL_SUBDOMAIN = "dish-it-up";

const ngrokUrl = `${process.env.EXPO_TUNNEL_SUBDOMAIN}.ngrok.io`;

/** @type {import('expo/config').ExpoConfig} */
module.exports = {
  // ...
  name: "Dish It Up",
  slug: "dish-it-up",
  version: "1.0.0",
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
  },
  web: {
    bundler: "metro",
    favicon: "./assets/favicon.png",
  },
  ios: {
    buildNumber: "4",
    supportsTablet: true,
    bundleIdentifier: "com.danielkrux.dishitup",
    associatedDomains: [
      `applinks:${ngrokUrl}`,
      `activitycontinuation:${ngrokUrl}`,
      `webcredentials:${ngrokUrl}`,
    ],
  },
  plugins: [
    "expo-font",
    "expo-build-properties",
    "./modules/react-native-ocr/app.plugin.js",
    [
      "expo-router",
      {
        headOrigin:
          process.env.NODE_ENV === "development"
            ? `https://${ngrokUrl}`
            : "https://dish-it-up.danielkrux.dev",
      },
    ],
    [
      "expo-config-plugin-ios-share-extension",
      {
        activationRules: {
          NSExtensionActivationSupportsWebURLWithMaxCount: 1,
        },
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
    [
      "./src/plugins/withAndroidShareExtension/index.js",
      {
        androidIntentFilters: ["text/*", "image/*"],
      },
    ],
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
  runtimeVersion: {
    policy: "appVersion",
  },
  updates: {
    url: "https://u.expo.dev/b56a0bb4-b7e6-4823-b7cc-048af43d7698",
  },
};
