module.exports={
    lintOnSave: false,
    // 配置代理服务器解决浏览器向服务器发送数据跨域问题
    devServer: {
        proxy: {
          '/api': {
            target: 'http://gmall-h5-api.atguigu.cn',
            ws: true,
            changeOrigin: true
          },
    
        }
      }
}