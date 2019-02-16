let path = require('path')
let webpack = require('webpack')
module.exports = {
  mode:'development',
  entry:{
    react:['react','react-dom'],
    // test:'./src/test.js'
  },
  output:{
    filename:'_dll_[name].js',
    path:path.resolve(__dirname,'dist'),
    library:'_dll_[name]', // 产出的变量就什么名
    libraryTarget:'this' // var  commonjs  umd
  },
  plugins:[
    new webpack.DllPlugin({
      name:'__dll_[name]',
      path:path.resolve(__dirname,'dist','mainfest.json'), //生成清单 
    })
  ]
}