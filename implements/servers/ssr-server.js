const startServer = require('universal-webpack/server');
const settings = require('../universal-webpack/universal-webpack-settings.json');
// `configuration.context` and `configuration.output.path` are used
const configuration = require('../webpack/webpack.config');

startServer(configuration, settings);
