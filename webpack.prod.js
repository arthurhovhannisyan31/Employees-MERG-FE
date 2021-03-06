const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const TerserPlugin = require("terser-webpack-plugin");
require("dotenv").config({path: '.env'});

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        test: /\.(ts|js)x?$/,
        exclude: [/\/node_modules/, /\/dist/],
      }),
    ],
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    realContentHash: true,
  },
});
