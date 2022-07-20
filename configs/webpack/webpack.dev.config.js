/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const { merge } = require('webpack-merge')

const common = require('./webpack.common.config')
require('dotenv').config({ path: './configs/env/.env-dev' })

module.exports = merge(common, {
  target: 'web',
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    allowedHosts: 'all',
    client: {
      progress: false,
      webSocketURL: {
        port: 443,
      },
    },
    historyApiFallback: true,
    host: process.env.HOST,
    server: {
      type: 'https',
      options: {
        key: fs.readFileSync(path.resolve('configs', 'cert', 'key.pem')),
        cert: fs.readFileSync(path.resolve('configs', 'cert', 'cert.pem')),
      },
    },
    http2: true,
    port: process.env.PORT || 3000,
    proxy: {
      [process.env.API_URL]: `${process.env.PROXY_URL}${process.env.API_URL}`,
    },
    static: {
      directory: path.join(__dirname, 'dist'),
      watch: {
        interval: 1000,
        ignored: /node_modules/,
      },
    },
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 500,
    poll: 1000,
  },
  plugins: [new CleanWebpackPlugin(), new webpack.HotModuleReplacementPlugin()],
})
