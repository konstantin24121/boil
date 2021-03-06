require('../config');

const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const context = process.cwd();
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactLoadablePlugin = require('react-loadable/webpack')
  .ReactLoadablePlugin;

const plugins = [];
const isServerBundle =
  process.env.IS_SERVER_BUNDLE && process.env.IS_SERVER_BUNDLE === 'true';

if (!isServerBundle) {
  plugins.push(
    new ReactLoadablePlugin({
      filename: `${global.boil.src}/server/react-loadable.json`,
    }),
  );
}

const commonConfig = {
  context,

  output: {
    path: global.boil.dist,
  },

  resolve: {
    modules: [global.boil.src, 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      common: path.join(global.boil.src, 'common'),
      atoms: path.join(global.boil.src, 'common/components/atoms'),
      modules: path.join(global.boil.src, 'common/reduck/modules'),
      icons: path.join(global.boil.src, 'static/icons'),
      static: path.join(global.boil.src, 'static'),
      utils: path.join(global.boil.src, 'utils'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: [global.boil.src],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.svg?$/,
        use: [
          {
            loader: 'react-svg-loader',
            query: {
              svgo: {
                pretty: true,
                plugins: [
                  {
                    removeStyleElement: true,
                  },
                  {
                    removeTitle: true,
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify(process.env.NODE_ENV),
      __IS_SERVER_BUNDLE__: process.env.IS_SERVER_BUNDLE,
      __DEVELOPMENT__: JSON.stringify(global.boil.isDevelopment),
      __APP_ID__: JSON.stringify(global.boil.appId),
      __BUGSNAG_ID__: JSON.stringify(global.boil.bugsnagId),
      __APP_META__: JSON.stringify(global.boil.appMeta),
    }),
    new ForkTsCheckerWebpackPlugin(),
    ...plugins,
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
