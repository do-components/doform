const debug = process.env.NODE_ENV !== 'production'
module.exports = {
  configureWebpack: config => {
    if (debug) {
      // 开发环境配置
      // config.devtool = 'source-map'
      config.devtool = 'cheap-module-eval-source-map'
    }
  },

  css: {
    sourceMap: true
  }
}
