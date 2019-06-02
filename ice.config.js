const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  alias: {
    components: path.join(__dirname, 'src/components'),
    layouts: path.join(__dirname, 'src/layouts'),
    utils: path.join(__dirname, 'src/utils'),
    pages: path.join(__dirname, 'src/pages'),
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
      // 第一项为具体插件，第二项为插件参数
      .use(ForkTsCheckerWebpackPlugin);
  }
}
