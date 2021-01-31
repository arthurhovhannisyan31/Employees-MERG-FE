const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const TerserPlugin = require('terser-webpack-plugin')

require('dotenv').config()

module.exports = {
  mode: 'production',
  entry: [path.resolve(__dirname, 'src', 'index.tsx')],
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
    chunkFilename: '[name].[contenthash].chunk.js',
  },
  optimization: {
    moduleIds: 'deterministic',
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.(ts|js)x?$/,
        exclude: [/\/node_modules/, /\/dist/],
      }),
    ],
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    realContentHash: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
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
    contentBase: path.join(__dirname, 'dist'),
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
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 8192 },
          },
        ],
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
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      cache: false,
      favicon: path.resolve(__dirname, 'src/static/img', 'favicon.ico'),
    }),
    new webpack.EnvironmentPlugin(['API_URL']),
    new webpack.ProvidePlugin({ process: 'process/browser' }),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: { _: path.resolve(__dirname, 'src') },
  },
}
