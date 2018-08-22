const path = require('path');

const config = {
  mode: 'production',
  entry: {
    app: [global.boil.entryPoint],
  },

  output: {
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
};

module.exports = config;
