const merge = require('webpack-merge');
const path = require('path');

const context = process.cwd();

global.src = path.resolve(context, 'src');
global.dist = path.resolve(context, 'dist');
global.isDevelopment = process.env.NODE_ENV === 'development';
global.isProduction = process.env.NODE_ENV === 'production';
global.entryPoint = path.join(global.src, 'index.tsx');

const commonConfig = {
  context,

  output: {
    path: global.dist,
  },

  resolve: {
    modules: [context, 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [global.src],
        loader: 'awesome-typescript-loader',
      },
    ],
  },
};

const productionConfig = require('./prod.config');
const developeConfig = require('./dev.config');

if (global.isDevelopment) {
  module.exports = merge.smart(commonConfig, developeConfig);
} else if (global.isProduction) {
  module.exports = merge.smart(commonConfig, productionConfig);
} else {
  module.exports = commonConfig;
  // throw Error(`\x1b[31m✖ ==> Our assembly have no ENV\x1b[0m like  ${process.env.NODE_ENV}`);
}
