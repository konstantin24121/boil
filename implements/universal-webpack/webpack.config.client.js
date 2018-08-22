const client = require('universal-webpack/config').client;
const settings = require('./universal-webpack-settings');
const configuration = require('../webpack/webpack.config');

module.exports = client(configuration, settings);
