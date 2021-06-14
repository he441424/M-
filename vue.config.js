module.exports = {
  lintOnSave: false, // 关闭eslint

  configureWebpack: {
    externals: {
      // vue: 'Vue',
      // 'element-ui': 'ELEMENT'
    }
  },
  publicPath: './'// 加入这个就不会部署服务器的时候报错

}
