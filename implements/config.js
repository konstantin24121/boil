require('dotenv').config();

const context = process.cwd();
const path = require('path');

let config = {
  port: +process.env.PORT || 3000,
  host: process.env.HOST || '0.0.0.0',
  src: path.resolve(context, 'src'),
  dist: path.resolve(context, 'dist'),
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV !== 'development',
  appId: 'app',
  get hmrServer() {
    return `http://${this.host}:${this.port + 1}/`;
  },
  get entryPoint() {
    return path.join(this.src, 'client', 'index.tsx');
  },
};

global.boil = config;
