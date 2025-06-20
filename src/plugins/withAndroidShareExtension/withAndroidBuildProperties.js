
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAndroidBuildProperties = void 0;
const config_plugins_1 = require("@expo/config-plugins");
function addBuildProperties(properties, sdkVersion, extraBuildProperties = {}) {
  return [
    ...properties,
    {
      type: "property",
      key: "android.kotlinVersion",
      value: "1.8.0",
    },
    ...Object.keys(extraBuildProperties).map((key) => ({
      type: "property",
      key: `android.${key}`,
      value: extraBuildProperties[key],
    })),
  ];
}
const withAndroidBuildProperties = (config, parameters) => {
  return (0, config_plugins_1.withGradleProperties)(config, (config) => {
    config.modResults = addBuildProperties(
      config.modResults,
      config.sdkVersion,
      parameters.androidExtraBuildProperties
    );
    return config;
  });
};
exports.withAndroidBuildProperties = withAndroidBuildProperties;
