let {smart} = require('webpack-merge')
let base = require('./webpack.base')
module.exports = smart(base,{
  mode:'development',
  devServer:{
    //3) 有服务端 不用用代理来处理 能不能再服务端中启动webpack 端口用服务端端口
    
    
    //2） 我们前端只想单纯来模拟数据
    // before(app){ // 提供的方法 钩子
    //   app.get('/user',(req,res)=>{
    //     res.json({name:'珠峰架构-before'})
    //   })
    // }
    //1）
    // proxy:{ // 重写的方式 把请求代理到express服务器上
    //   '/api':{
    //     target:'http://localhost:3000',
    //     pathRewrite:{'/api':''}
    //   }// 配置了一个代理
    // }
  },
})