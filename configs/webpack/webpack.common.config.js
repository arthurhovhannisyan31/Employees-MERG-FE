/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
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
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader'],
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
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve('public', 'index.html'),
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
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.mjs', '.json'],
  },
}
