const webpack = require('webpack');
const target = process.env.npm_lifecycle_event;
const merge = require('webpack-merge');

const commonConfig = {
  mode: 'development',
  devtool: 'eval',
  stats: 'errors-only',
};

const clearConfig = {
  entry: {
    app: [global.boil.entryPoint],
  },

  output: {
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
};

const hmrConfig = {
  entry: {
    app: [
      `webpack-hot-middleware/client?path=${global.boil.hmrServer}__webpack_hmr`,
      global.boil.entryPoint,
    ],
  },

  output: {
    filename: '[name].js',
    publicPath: global.boil.hmrServer,
  },

  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()],
};

if (/^dev/.test(target)) {
  module.exports = merge.smart(commonConfig, hmrConfig);
} else {
  module.exports = merge.smart(commonConfig, clearConfig);
}
