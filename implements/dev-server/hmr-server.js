const webpack = require('webpack');
const express = require('express');
const path = require('path');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

const PrettyError = require('pretty-error');
const pe = new PrettyError();

const webpackConfig = require('../universal-webpack/webpack.config.client');

const server = express();
const compiler = webpack(webpackConfig);
pe.start();

const context = process.cwd();

server.use(
  devMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    historyApiFallback: true,
    stats: {
      colors: true,
      timings: true,
      chunks: false,
    },
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': `http://localhost:${global.boil.port}`,
    },
  }),
);

server.use(hotMiddleware(compiler));

server.listen(global.boil.port + 1, function(err) {
  if (err) {
    return console.error(err);
  }
  console.info(`
======================================================================
💻 HMR server is running on \x1b[36m${
    global.boil.hmrServer
  }\x1b[0m. Happy shitting
======================================================================
    `);
});
