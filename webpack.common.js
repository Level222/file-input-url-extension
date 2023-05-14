const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    "background": "./src/background/index.js",
    "content-script": "./src/content-script/index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "./src/manifest.json"
        },
        {
          from: "./src/icons",
          to: "icons"
        }
      ]
    })
  ]
};
