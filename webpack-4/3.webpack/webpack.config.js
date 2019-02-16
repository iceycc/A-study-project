let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
let happypack = require('happypack')
module.exports = {
  mode:'development',
  entry:{
    index:'./src/index.js'
  },
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'dist')
  },
  devServer:{
    port:3000,
    open:true
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
            ]
          }
        }
      ]
    }),
    new webpack.DllReferencePlugin({
      manifest:path.resolve(__dirname,'dist','mainfest.json')//碰到类库变量先招清单，找不到再进行打包
    }),
    new HtmlWebpackPlugin({
      template:'./index.html',
      filename:'index.html'
    }),
    new webpack.IgnorePlugin(/\.\/locale/,/moment/)
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