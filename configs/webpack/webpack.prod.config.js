const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const common = require('./webpack.common.config')
require('dotenv').config({ path: '.env' })

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
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
  plugins: [
    new CompressionPlugin({
      threshold: 8192,
      minRatio: 0.8,
    }),
  ],
})
