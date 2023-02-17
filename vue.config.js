const { defineConfig } = require('@vue/cli-service')

module.exports = {
  assetsDir: 'static',
  parallel: false,
  publicPath: './',
  devServer:{
    host:'localhost',
    port:8081
  },
  transpileDependencies: true,
  lintOnSave:false
}




