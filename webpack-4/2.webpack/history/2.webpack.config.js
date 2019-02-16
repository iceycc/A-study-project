let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let CleanWebpackPlugin = require("clean-webpack-plugin");
let CopyWebpackPlugin = require("copy-webpack-plugin");
let webpack = require("webpack");
module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  resolve:{ // 解析 第三方包 commonjs
    modules:[path.resolve('node_modules')],
    mainFields:['style','main'],// 指定第三方包的查找入口文件的路径 先找style 再找 main
    mainFiles:[],// 入口文件的名字
    extensions:['.js','.css','.json','.vue'],// 不加后缀名。自动搜索
    alias:{ // 别名 vue vue.runtime
      bootstrap:'bootstrap/dist/css/bootstrap.css'
    }
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
    ]
  },
  devServer: {
    // port: "3001",
    // host: "0.0.0.0",
    // contentBase:path.resolve(__dirname,'dist'),
    // overlay:true, // ??l
    // proxy: {
    //   '/api': 'http://localhost:3000'
    // }
    // 1）
    // proxy:{
    //   '/api':{
    //     target:'http://localhost:3000',
    //     pathRewrite:{
    //       '/api':''
    //     }
    //   }
    // }
    // 2）前端单纯的临时模拟数据
    before(app){ // 提供的方法钩子
      app.get('/api/user',(req,res)=>{
        res.json({name:'王冰洋111aaa'})
      })
    },
    // 3)有服务端 不用用代理来处理 能不能在服务端中启动webpack 端口用服务端端口
  },
  // watch: true,
  // watchOptions: {
  //   // 监控的选项
  //   poll: 1000, // 每秒 问我 1000次
  //   aggregateTimeout: 500, // 防抖 我一直输入代码
  //   ignored: /node_modules/ // 不需要进行监控哪个文件
  // },
  // 1) 源码映射 会单独生成一个sourcemap文件 出错了 会标识 当前报错的列和行 大 和 全
  // devtool:'source-map', // 增加映射文件 可以帮我们调试源代码
  // 2) 不会产生单独的文件 但是可以显示行和列
  //   devtool: "eval-source-map",
  // 3)  不会产生列 但是是一个单独的映射文件
  // devtool: "cheap-module-source-map", // 产生后你可以保留起来
  // 4) 不会长生文件 集成在打包后的文件中 不会产生列
  // devtool: "cheap-module-eval-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html"
    }),
    new CleanWebpackPlugin(["./dist"]),
    new CopyWebpackPlugin([{ from: "docs", to: "docs" }]),
    new webpack.BannerPlugin("make 2019 by icey"),

    new webpack.DefinePlugin({
      DEV:JSON.stringify('production'), // 或者用JSON.stringify
      FLAG:'true', // 布尔值不需要
      expression:"'1+1'", // 数值相加的话如果想要结构的话不能JSON.stringify，JSON.stringify会把字符串传人
      result:'1+1'
    })
  ]
};
