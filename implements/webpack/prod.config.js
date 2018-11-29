const context = process.cwd();
const path = require('path');
const webpack = require('webpack');

const { BugsnagSourceMapUploaderPlugin } = require('webpack-bugsnag-plugins');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WorkboxPlugin = require('workbox-webpack-plugin');

const plugins = [];

const isServerBundle =
  process.env.IS_SERVER_BUNDLE && process.env.IS_SERVER_BUNDLE === 'true';

if (!isServerBundle && global.boil.bugsnagId) {
  plugins.push(
    new BugsnagSourceMapUploaderPlugin({
      apiKey: global.boil.bugsnagId,
      appVersion: global.boil.appMeta.version,
      overwrite: true,
      publicPath: '*/',
    }),
  );
}

if (process.env.WITH_ANALYZE) {
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: path.join(
        context,
        `reports/${global.boil.platformName}/${
          global.boil.appMeta.version
        }/${Date.now()}/report.html`,
      ),
      generateStatsFile: true,
      statsFilename: path.join(
        context,
        `reports/${global.boil.platformName}/${
          global.boil.appMeta.version
        }/${Date.now()}/stats.json`,
      ),
    }),
  );
}

if (!isServerBundle) {
  plugins.push(
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
    }),
  );
}

const config = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    app: [global.boil.entryPoint],
  },

  output: {
    publicPath: '/',
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
  },
  plugins: [...plugins, new webpack.HashedModuleIdsPlugin()],

  optimization: isServerBundle
    ? {}
    : {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          minSize: 0,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: Infinity,
          automaticNameDelimiter: '~',
          name: true,
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      },
};

module.exports = config;
