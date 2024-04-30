const { withDangerousMod, withPlugins } = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

async function readFile(path) {
  return fs.promises.readFile(path, "utf8");
}

async function saveFile(path, content) {
  return fs.promises.writeFile(path, content, "utf8");
}

module.exports = (config) =>
  withPlugins(config, [
    (config) => {
      return withDangerousMod(config, [
        "ios",
        async (config) => {
          const file = path.join(
            config.modRequest.platformProjectRoot,
            "Podfile"
          );

          const contents = (await readFile(file)).replace(
            `installer.pods_project.targets.each do |t|\nt.build_configurations.each do |config|\nconfig.build_settings['ONLY_ACTIVE_ARCH'] = 'NO'\nend\nend\n`,
            ""
          );

          const [before, after] = contents.split("post_install do |installer|");

          /*
           * Now re-adds the content
           */
          await saveFile(
            file,
            `${before}

            post_install do |installer|
            installer.pods_project.targets.each do |t|
            t.build_configurations.each do |config|
            config.build_settings['ONLY_ACTIVE_ARCH'] = 'NO'
            end
            end
            
            ${after}`
          );
          return config;
        },
      ]);
    },
  ]);
