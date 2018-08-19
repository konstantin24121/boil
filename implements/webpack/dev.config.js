const webpack = require("webpack");
const path = require("path");

const host = process.env.HOST || "localhost";
const port = +process.env.PORT || 3000;

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  entry: {
    app: [
      "webpack-hot-middleware/client",
      path.join(global.src, "index.ts")
    ]
  },

  output: {
    path: '/',
    filename: "[name].js",
    publicPath: `http://${host}:${port}/`
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
