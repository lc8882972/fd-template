const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SimpleProgressPlugin = require('webpack-simple-progress-plugin');
const ThemePlugin = require('@alifd/next-theme-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const DEV = process.env.DEV;
const cwd = process.cwd();
const sourcePath = path.join(__dirname, './src');

// 获取 package.json 中的主题配置文件
let theme = '';
try {
  const pkg = require('./package.json');
  if (pkg && pkg.buildConfig && pkg.buildConfig.theme) {
    theme = pkg.buildConfig.theme;
  } else {
    const fieConfig = require('./fie.config.js');
    if (fieConfig && fieConfig.toolkitConfig && fieConfig.toolkitConfig.theme) {
      theme = fieConfig.toolkitConfig.theme;
      console.warn(`fie中的主题包配置已迁移, 请在 package.json 中配置
      buildConfig:{
        theme: '@alife/dpl-主题包名'
      }`);
    }
  }
} catch (e) {
  console.error(e);
  console.log(`请在 package.json 中配置
  buildConfig:{
    theme: '@alife/dpl-主题包名'
  }`);
}

const scssLoader = [
  {
    loader: 'css-loader',
    options: {
      minimize: true,
      sourceMap: false,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      indent: 'postcss',
      plugins: () => [
        require('autoprefixer')(),
      ],
      sourceMap: false,
    },
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: false,
    },
  },
];

if (theme) {
  console.log(`NOTICE: 注入 ${theme}/variables.scss 到每个 scss 文件`.green);
  scssLoader.push({
    loader: '@alifd/next-theme-loader',
    options: {
      theme,
      // base: '@alifd/next'
    },
  });
}

const config = {
  context: cwd,
  devtool: false,
  entry: {
    'index': ['./src/index.tsx']
  },
  output: {
    path: path.resolve(process.env.BUILD_DEST || 'dist'),
    publicPath: '/',
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      components: path.join(__dirname, 'src/components'),
      layouts: path.join(__dirname, 'src/layouts'),
      utils: path.join(__dirname, 'src/utils'),
      pages: path.join(__dirname, 'src/pages'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.scss/,
        use: [
          MiniCssExtractPlugin.loader,
          ...scssLoader
        ],
      },
    ],
  },
  plugins: [
    new ThemePlugin(theme),
    // new webpack.ContextReplacementPlugin(
    //   /moment[\\\/]locale$/,
    //   /^\.\/(zh-cn)$/
    // ),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.[contenthash:8].css',
      chunkFilename: '[name].bundle.[chunkhash:8].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.bundle\..*\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true,
    }),
    new HtmlWebpackPlugin({
      template: './static/index.html'
    }),
    // 允许错误不打断程序
    new webpack.NoEmitOnErrorsPlugin(),
    // 美化打包进度条
    new SimpleProgressPlugin(),
    // 环境变量定义
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(DEV ? 'development' : 'production'),
      },
      __DEV__: JSON.stringify(JSON.parse(DEV ? 'true' : 'false')),
    }),
    new BundleAnalyzerPlugin()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
};

module.exports = config;
