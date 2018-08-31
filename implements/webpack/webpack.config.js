require('../config');

const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const context = process.cwd();

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
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [global.boil.src],
        loader: 'awesome-typescript-loader',
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
