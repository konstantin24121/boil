const { BugsnagSourceMapUploaderPlugin } = require('webpack-bugsnag-plugins');

const plugins = [];

if (
  process.env.IS_SERVER_BUNDLE &&
  process.env.IS_SERVER_BUNDLE === 'false' &&
  global.boil.bugsnagId
) {
  plugins.push(
    new BugsnagSourceMapUploaderPlugin({
      apiKey: global.boil.bugsnagId,
      appVersion: global.boil.appMeta.version,
      overwrite: true,
      publicPath: '*/',
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
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  plugins,
};

module.exports = config;
