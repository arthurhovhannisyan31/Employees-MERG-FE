const webpack = require('webpack')
const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    host: 'localhost',
    hot: true,
    port: process.env.PORT || 3000,
    inline: true,
    disableHostCheck: true,
    historyApiFallback: true,
    watchOptions: {
      poll: 1000,
      ignored: ['node_modules'],
    },
    contentBase: path.join(__dirname, "dist"),
    proxy: {
      [process.env
        .API_URL]: `${process.env.PROXY_URL_DEV}${process.env.API_URL}`,
    },
  },
  plugins: [
    ...common.plugins,
    new CleanWebpackPlugin(),
    new webpack.ProgressPlugin({ percentBy: 'entries' }),
    new webpack.HotModuleReplacementPlugin(),
  ]
})
