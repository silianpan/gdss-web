// 导入compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css']

const path = require('path')
// const fs = require('fs')
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/gdss/' : '/',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
      .set('vue$', resolve('node_modules/vue/dist/vue.esm.js'))
    const svgRule = config.module.rule('svg')
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, './src/assets/svgs'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    const fileRule = config.module.rule('file')
    fileRule.uses.clear()
    fileRule
      .test(/\.svg$/)
      .exclude.add(path.resolve(__dirname, './src/assets/svgs'))
      .end()
      .use('file-loader')
      .loader('file-loader')
  },
  productionSourceMap: false,
  transpileDependencies: ['axios-logger', 'chalk', 'ansi-styles'],
  parallel: require('os').cpus().length > 1,
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    https: false,
    hotOnly: false,
    useLocalIp: true,
    proxy: {
      '/api-gdss': {
        target: 'http://127.0.0.1:8001',
        // target: 'http://47.108.232.112:8001',
        pathRewrite: {
          '^/api-gdss': '/'
        }
      },
      '/dbapi': {
        target: 'http://47.108.232.112:8002',
        pathRewrite: {
          '^/dbapi': '/'
        }
      },
      '/bioisp-api': {
        target: 'https://bioisp-api.hsmap.com',
        pathRewrite: {
          '^/bioisp-api': '/'
        }
      }
    },

    before: () => { }
  },
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  },
  css: {
    loaderOptions: {
      // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      }
    }
  }
}
