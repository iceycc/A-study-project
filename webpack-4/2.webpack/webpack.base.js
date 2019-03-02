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
    modules:[path.resolve('node_modules')],
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

class A {
  async get(){
    let res = await new Promise((resolve,reject)=>{
      resolve('11')
    })
    console.log(res)
  }
}

let fn = new A()
fn.get()

@fn
function C(){
  
}