const merge = require("webpack-merge");
const path = require('path');

const productionConfig = require('./prod.config');

const context = process.cwd();

global.src = path.resolve(context, "src");
global.isDevelopment = process.env.NODE_ENV === "development";
global.isProduction = process.env.NODE_ENV === "production";

const commonConfig = {
  context,

  resolve: {
    modules: [context, "node_modules"],
    extensions: [".js", ".jsx"]
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [global.src],
        loader: "babel-loader",
        options: {
          compact: false
        }
      }
    ]
  }
};

if (global.isDevelopment) {
  // module.exports = merge.smart(commonConfig, developeConfig);
} else if (global.isProduction) {
  module.exports = merge.smart(commonConfig, productionConfig);
} else {
  module.exports = commonConfig;
  // throw Error(`\x1b[31m✖ ==> Our assembly have no ENV\x1b[0m like  ${process.env.NODE_ENV}`);
}
