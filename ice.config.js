const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const css_modules = require('css-modules-typescript-loader');
module.exports = {
  entry: './src/index.tsx',
  alias: {
    components: path.join(__dirname, 'src/components'),
    layouts: path.join(__dirname, 'src/layouts'),
    utils: path.join(__dirname, 'src/utils'),
    pages: path.join(__dirname, 'src/pages'),
    'react-dom': '@hot-loader/react-dom'
  },
  vendor: true,
  plugins: [
    ['ice-plugin-fusion', {
      // 主题包
      themePackage: '@alifd/theme-2'
    }],
    ['ice-plugin-moment-locales', {
      locales: ['zh-cn', 'en-au']
    }]
  ],
  chainWebpack: (config) => {

    config.optimization.splitChunks(
      {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'initial',
            minChunks: 1,
          },
        },
      }
    );
    config
      // 定义插件名称
      .plugin('ForkTsCheckerWebpackPlugin')
      .use(ForkTsCheckerWebpackPlugin);
    // config
    //   .plugin('WatchIgnorePlugin')
    //   .use(webpack.WatchIgnorePlugin, [[/s?css\.d\.ts$/]]);
    // const rule = config.module
    //   .rule('scss-module')  // ice-scripts 中已定义这条规则

    // rule.before('css-loader').use('css-modules-typescript-loader').loader('css-modules-typescript-loader');
  }
}


