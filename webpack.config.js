const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

require('dotenv').config()

module.exports = {
  mode: 'production',
  devServer: {
    host: 'localhost',
    hot: true,
    port: 3000,
    inline: true,
    disableHostCheck: true,
    historyApiFallback: true,
    watchOptions: {
      poll: 1000,
      ignored: ['node_modules'],
    },
  },
  devtool: 'inline-source-map',
  entry: [path.resolve(__dirname, 'src', 'index.tsx')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].bundle.js',
    publicPath: '/',
    chunkFilename: '[name].[hash].bundle.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        exclude: /node_modules|lib/,
        test: /\.(ts|js)x?$/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new webpack.EnvironmentPlugin(['API_URL']),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      _: path.resolve(__dirname, 'src'),
    },
  },
}
