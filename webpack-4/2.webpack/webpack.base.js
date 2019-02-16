let path = require('path')
let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry:{home:'./src/index.js'},
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'dist')
  },
  resolve:{
    modules:[path.resol ve('node_modules')],
    extensions:['.js','.css','.json','.vue'],
  alias:{
    bootstrap:'bootstrap/dist/css/bootstrap.css'
  }
  },
  plugins:[
    new webpack.DefinePlugin({
      DEV:JSON.stringify('development'),
      FLAG:'true',
      EXPORESSION:JSON.stringify('1+1')
    }),
    new HtmlWebpackPlugin({
      template:'./index.html',
      filename:'index.js'
    })
  ],
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ]
  }
}