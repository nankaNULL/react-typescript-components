const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const buildPath = path.resolve(__dirname, '../dist');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
  mode: 'production',
  context: path.resolve(__dirname, '../src/components'), // 解析起点
  entry: {
    yuwan: ['./index.tsx', './style/index.scss'],
    "yuwan.min": './index.tsx'
  },
  output: {
    path: buildPath, // 输出文件存放在本地的目录
    filename: '[name].js',
    library: 'yuwan',
    libraryTarget: "umd"
  },
  resolve: { // 配置 Webpack 如何寻找模块所对应的文件
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css', '.json'], // 用于配置在尝试过程中用到的后缀列表
  },
  externals: {
    'FRONT_CONF': 'FRONT_CONF'
  },
  module: {
    rules: [{ // 配置模块的读取和解析规则，通常用来配置 Loader
      test: /\.js|jsx$/,
      exclude: /node_modules/, // exclude不包括，include只命中
      use: ['babel-loader?cacheDirectory'],
    },
    {
      test: /\.ts|tsx?$/,
      use: ['babel-loader', 'ts-loader'],
      exclude: /node_modules/,
    },
    {
      test: /\.(less|css)$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true
          }
        }
      ],
    },
    {
      test: /\.(scss|sass)$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
      ]
    },
    {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?[tv]=[\d.]+)*$/,
      use: ['file-loader?name=[name].[ext]']
    }
    ]
  },
  performance: {
    hints: false,
  },
  optimization: {
    minimize: true,
    noEmitOnErrors: true,
    minimizer: [
      new UglifyJsPlugin({
        include: /\.min\.js$/,
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'yuwan.css',
    }),
    new CopyWebpackPlugin([
      // { from: path.resolve(__dirname, '../public/images'), to: 'images' },
      // { from: path.resolve(__dirname, '../public/fonts'), to: 'fonts' },
    ]),
    new webpack.DefinePlugin({
      __PRODUCTION: JSON.stringify(true)
    }),
  ]
};

