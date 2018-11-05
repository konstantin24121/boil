require('dotenv').config();

const context = process.cwd();
const path = require('path');
const packageData = require('../package.json');

const os = require('os');
const ifaces = os.networkInterfaces();
let host = '0.0.0.0';

Object.keys(ifaces).forEach(function(ifname) {
  ifaces[ifname].forEach(function(iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      return;
    }

    host = iface.address;
  });
});

function getPlatformName() {
  if (process.env.IS_SERVER_BUNDLE === 'true') {
    return 'server';
  }
  return 'web';
}

let config = {
  port: +process.env.PORT || 3000,
  host: process.env.HOST || host,
  src: path.resolve(context, 'src'),
  dist: path.resolve(context, 'dist'),
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV !== 'development',
  appId: 'app',
  bugsnagId: 'c6dcfa47308b7d10015b70c6d6fed6dd',
  hostname: 'l.boil.io',
  cacheLifeTime: 60 * 1000,
  cacheLimit: 1000,
  platformName: getPlatformName(),
  appMeta: {
    version: packageData.version,
    name: packageData.name,
  },
  get hmrServer() {
    return `http://${this.host}:${this.port + 1}/`;
  },
  get entryPoint() {
    return path.join(this.src, 'client', 'index.tsx');
  },
};

global.boil = config;
