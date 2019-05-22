const path = require("path");
const webpackMerge = require("webpack-merge");

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
const presetConfig = require("./build-utils/loadPresets");

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
  console.log(`Building for: ${mode}`);

  return webpackMerge(
    {
      mode,
      target: "node",

      entry: {
        main: path.join(__dirname, "./src/index.js")
      }
    },
    modeConfig(mode),
    presetConfig({ mode, presets })
  );
};
