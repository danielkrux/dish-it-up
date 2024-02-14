process.env.TAMAGUI_TARGET = "native";

// biome-ignore lint/complexity/useArrowFunction: <explanation>
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["nativewind/babel", "react-native-reanimated/plugin"],
  };
};
