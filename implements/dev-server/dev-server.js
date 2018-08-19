const webpack = require("webpack");
const express = require("express");
const path = require("path");
const devMiddleware = require("webpack-dev-middleware");
const hotMiddleware = require("webpack-hot-middleware");

const PrettyError = require("pretty-error");
const pe = new PrettyError();

const webpackConfig = require("../webpack/webpack.config.js");

const server = express();
const compiler = webpack(webpackConfig);
pe.start();

const context = process.cwd();
const host = process.env.HOST || "localhost";
const port = +process.env.PORT || 3000;
const portDevServer = port + 1;

server.use(
  devMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    historyApiFallback: true,
    stats: {
      colors: true,
      timings: true,
      chunks: false
    },
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": `http://${host}:${portDevServer}`
    }
  })
);

server.use(hotMiddleware(compiler));

server.use('*', (req, res, next) => {
  res.sendFile(path.join(context, '/src/index.html'));
});

server.listen(portDevServer, host, function(err) {
  if (err) {
    return console.error(err);
  }

  console.info(`==> 💻 Webpack dev server is running on http://${host}:${portDevServer}. Happy shitting`);
});
