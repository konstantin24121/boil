const config = {
  mode: "production",
  entry: {
    main: ["./src/index.js"]
  },

  output: {
    publicPath: "/",
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js"
  }
};

module.exports = config;
