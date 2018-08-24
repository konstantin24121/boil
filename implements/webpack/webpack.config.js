require('../config');

const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const context = process.cwd();

const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

const commonConfig = {
  context,

  output: {
    path: global.boil.dist,
  },

  resolve: {
    modules: [context, 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [new TsConfigPathsPlugin()],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [global.boil.src],
        loader: 'awesome-typescript-loader',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify(process.env.NODE_ENV),
      __IS_SERVER_BUNDLE__: JSON.stringify(process.env.IS_SERVER_BUNDLE),
      __DEVELOPMENT__: JSON.stringify(global.boil.isDevelopment),
      __APP_ID__: JSON.stringify(global.boil.appId),
    }),
  ],
};

const productionConfig = require('./prod.config');
const developeConfig = require('./dev.config');

if (global.boil.isDevelopment) {
  module.exports = merge.smart(commonConfig, developeConfig);
} else if (global.boil.isProduction) {
  module.exports = merge.smart(commonConfig, productionConfig);
} else {
  module.exports = commonConfig;
}
