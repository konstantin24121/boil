const path = require("path");

const config = {
  mode: "production",
  entry: {
    app: [path.join(global.src, "index.js")],
  },

  output: {
    publicPath: "/",
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js"
  }
};

module.exports = config;
