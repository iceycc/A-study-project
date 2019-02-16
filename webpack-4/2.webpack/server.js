let express = require('express')
let app = express()
let webpack = require('webpack')
// 引入中间件
let middle = require('webpack-dev-middleware')
// 引入webpack配置
let config = require('./webpack.config')
// 编译webpack配置
let compiler = webpack(config)
// 使用中间件 在启动服务端时 在同一端口同时启动客户端 使端口相同解决跨域
app.use(middle(compiler))
// app.get('/api/user',(req,res)=>{
//   res.json({name:'王冰洋'})
// })
app.get('/user',(req,res)=>{
  res.json({name:'王冰洋'})
})
app.listen(3000,()=>{
  console.log('http://localhost:3000 Ready');
})