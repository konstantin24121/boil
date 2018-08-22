const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    app: [
      `webpack-hot-middleware/client?path=${
        global.boil.hmrServer
      }__webpack_hmr`,
      global.boil.entryPoint,
    ],
  },

  output: {
    filename: '[name].js',
    publicPath: global.boil.hmrServer,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
