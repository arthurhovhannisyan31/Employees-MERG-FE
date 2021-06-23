const webpack = require('webpack')
const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
require('dotenv').config({ path: '.env-dev' })

module.exports = merge(common, {
  target: "web",
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
      watch: {
        interval: 1000,
        ignored: /node_modules/,
      },
    },
    firewall: false,
    host: process.env.APP_URL_DEV,
    port: process.env.PORT || 3000,
    historyApiFallback: true,
    proxy: {
      [process.env.API_URL]: `${process.env.PROXY_URL}${process.env.API_URL}`,
    },
  },
  plugins: [
    ...common.plugins,
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin({ percentBy: 'entries' }),
    new webpack.HotModuleReplacementPlugin(),
  ],
})
