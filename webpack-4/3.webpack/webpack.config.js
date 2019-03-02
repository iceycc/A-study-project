let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
let happypack = require('happypack')
module.exports = {
  // optimization:{ // 原来叫commonChunkPlugins
  //   splitChunks:{
  //     cacheGroups:{
  //       common:{
  //         chunks:'initial',
  //         minSize:0,
  //         minChunks:2
  //       },
  //       vendor:{ // 第三方
  //         priority:1, // 增加权重
  //         test:/node_modules/, // 把你抽离出来
  //         chunks:'initial',
  //         minSize:0,
  //         minChunks:2
  //       }
  //     }
  //   }
  // },
  mode:'production',
  entry:{
    index:'./src/index.js',
    // other:'./src/other.js'
  },
  devServer:{
    hot:true, // 启用热更新
    port: 3000,
    open: true,
    contentBase: './dist'
  },
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'dist')
  },
  devServer:{
    port:3000,
    open:true,
    hot:true
  },
  plugins:[
    // new happypack({
    //   id:'css',
    //   use:['style-loader','css-loader']
    // }),
    new happypack({
      id:'js',
      use:[
        {
          loader:'babel-loader',
          options:{
            presets:[
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins:[
              '@babel/plugin-syntax-dynamic-import'
            ]
          }
        }
      ]
    }),
    // new webpack.DllReferencePlugin({
    //   manifest:path.resolve(__dirname,'dist','mainfest.json')//碰到类库变量先招清单，找不到再进行打包
    // }),
    new HtmlWebpackPlugin({
      template:'./index.html',
      filename:'index.html'
    }),
    new webpack.IgnorePlugin(/\.\/locale/,/moment/),
    new webpack.NamedModulesPlugin(), // 哪个模块更新了打印更新的模块路径

    new webpack.HotModuleReplacementPlugin() // 热更新插件
  ],
  module:{
    noParse:/jquery/,
    rules:[
      {
        test:/\.js$/,
        exclude: /node_modules/,
        include: path.resolve('src'),
        use:'happypack/loader?id=js'
      }
    ]
  }
}