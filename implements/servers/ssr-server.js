const startServer = require('universal-webpack/server');
const settings = require('../universal-webpack/universal-webpack-settings.json');
const hostile = require('hostile');
// `configuration.context` and `configuration.output.path` are used
const configuration = require('../webpack/webpack.config');

if (global.boil.hostname && global.boil.isDevelopment) {
  hostile.set(global.boil.host, global.boil.hostname, function(err) {
    if (err) {
      console.error(`Boil can not set hostname ${global.boil.hostname}, use ip instead.`);
      global.boil.hostname = undefined;
    } else {
      console.log(`Host ${global.boil.hostname} successfully created.`);
    }
    startServer(configuration, settings);
  });
} else {
  startServer(configuration, settings);
}
