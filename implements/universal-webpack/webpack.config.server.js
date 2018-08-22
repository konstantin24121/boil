const server = require('universal-webpack/config').server;
const settings = require('./universal-webpack-settings');
const configuration = require('../webpack/webpack.config');

module.exports = server(configuration, settings);
