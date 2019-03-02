let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let DonePlugin = require('./plugins/DonePlugin')
let AsyncPlugin = require('./plugins/AsyncPlugin')
let FileListPlugin = require('./plugins/FileListPlugin')
module.exports = {
  mode:'development',
  entry: './src/index.js',
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'dist')
  },
  plugins:[
    new HtmlWebpackPlugin({
      title:'dev1',
      template:'./src/index.html',
      templateParameters:{
        params1:'vue',
        params2:'react',
      }
    }),
    new FileListPlugin({
      template:'list.md'
    })
    // new DonePlugin(),
    // new AsyncPlugin()
  ]
}