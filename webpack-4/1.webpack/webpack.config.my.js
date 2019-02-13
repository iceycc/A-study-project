// webpack是node写出来都.支持commonJS语法
let path = require('path')// 核心模块 直接引入

module.exports = {
    mode:'development',// 模式 默认两种 product development
    entry:'./src/index.js',// 入口
    output:{
        filename:'bundle.js',// 打包后都文件名
        path:path.resolve(__dirname,'dist'),//输出路径必须是一个绝对路径
    },
    devServer:{ // 开发服务器配置
        port:'3000', // 配置端口
        progress:true, // 显示进度条
        contentBase:'./build',
        compress:true,// gzp压缩
    }
}