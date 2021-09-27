/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  target: ['web', 'es2020'],
  entry: [path.resolve('src', 'index.tsx')],
  output: {
    path: path.resolve('dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
    chunkFilename: '[name].[contenthash].chunk.js',
  },
  module: {
    rules: [
      {
        exclude: [/node_modules/],
        test: /\.(ts|js)x?$/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: { outputPath: 'public' },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('src', 'index.html'),
      cache: false,
      favicon: path.resolve('src/static/img', 'favicon.ico'),
    }),
    new webpack.EnvironmentPlugin([
      'API_URL',
      'PROXY_URL',
      'APP_URL_DEV',
      'PORT',
    ]),
    new webpack.ProvidePlugin({ process: 'process/browser' }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
}
