const { defineConfig } = require('@vue/cli-service')


let proxyObj={}

proxyObj['/']={
  //websocket
  ws:false,
  target:'http://localhost:7777',
  changeOrigin: true,
  pathReWrite:{
    '^/':'/'
  }
}
module.exports = {

  devServer:{
    host:'localhost',
    port:8080,
    proxy:proxyObj
  },
  transpileDependencies: true,
  lintOnSave:false
}




