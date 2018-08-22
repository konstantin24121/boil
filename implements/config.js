const context = process.cwd();
const path = require('path');

let config = {
  port: +process.env.PORT || 3000,
  src: path.resolve(context, 'src'),
  dist: path.resolve(context, 'dist'),
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  appId: 'app',
  get hmrServer() {
    return `http://localhost:${this.port + 1}/`;
  },
  entryPoint: path.join(context, 'src', 'client', 'index.tsx'),
};

global.boil = config;
