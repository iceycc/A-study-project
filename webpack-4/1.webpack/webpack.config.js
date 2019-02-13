// webpack是node写出来都.支持commonJS语法
let path = require("path"); // 核心模块 直接引入
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let UglifyJsPlugin = require("uglifyjs-webpack-plugin");
let OptimizeCss = require("optimize-css-assets-webpack-plugin");
let webpack = require("webpack");
module.exports = {
  optimization: {
    // 优化项目
    minimizer: [
      // 优化项
      new UglifyJsPlugin({
        // 压缩js的
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCss() // 压缩css的
    ]
  },
  mode: "production", // 模式 默认两种 production development // production模式下默认会对js进行压缩
  entry: "./src/index.js", // 入口
  output: {
    // filename: "bundle.[hash:8].js", // production模式下 打包后都文件名 bundle.837d4b66e7e90172246e.js
    filename: "js/bundle.js", //  development 下
    path: path.resolve(__dirname, "dist"), //输出路径必须是一个绝对路径
    // publicPath:'http://icey.cc',// 统一给资源路径设置域名 默认在当前项目根目录下
    // publicPath:'./' ,// css文件中引入的图片就找不到了。需要设置别名
    publicPath:'/' // 项目直接放在站点根目录没问题，但是放到子目录下会出问题。宗上建议统一设置别名
  },
  devServer: {
    // 开发服务器配置
    port: "3000", // 配置端口
    progress: true, // 显示进度条
    contentBase: "./src", // 启动
    compress: true // gzp压缩
  },
  plugins: [
    // 插件数组
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        // 压缩
        removeAttributeQuotes: true, // 删除双引号
        collapseWhitespace: false // 打包成一行
      }
      //   hash: true // hash  bundle.js?837d4b66e7e90172246e
    }),
    new MiniCssExtractPlugin({
      filename: "css/main.[hash:8].css",
      minify: {}
      //   hash: true // hash  bundle.js?837d4b66e7e90172246e
    }),
    new webpack.ProvidePlugin({
      // 在每个模块中都注入$
      $: "jquery"
    })
  ],
  externals: {
    // 外部引入的不需要打包
    jquery: "$"
  },
  module: {
    //模块
    // loader的特点 希望功能单一
    // loader的用法
    // 1. 字符串只有一个loader
    // 2. 多个loader需要 []数组
    // 3. loader的顺序 默认从右向左,
    // 4. loader可以写出对象模式
    rules: [
      // 规则
      //1. 配置eslint
      //
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: "eslint-loader",
      //     options: {
      //       enforce: "pre" // 强制提前
      //     }
      //   }
      // },
      //2. 配置jq挂载全局 windwow.$
      // {
      //   test:require.resolve('jquery'),
      //   use:'expose-loader?$'
      // },
      //3. js
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            // 用babel-laoder将es6转化为es5
            presets: ["@babel/preset-env"],
            plugins: [
              // 小插件 针对某些小版本js
              // "@babel/plugin-proposal-decorators", // 装饰器转换 注意顺序 再这个
              // "@babel/plugin-proposal-class-properties", // es7-es5 注意顺序 先这个
              ["@babel/plugin-proposal-decorators", { legacy: true }], // 装饰器转换 注意顺序 再这个
              ["@babel/plugin-proposal-class-properties", { loose: true }], // es7-es5 注意顺序 先这个
              "@babel/plugin-transform-runtime" //
            ]
          }
        },
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/
      },
      // 4. css
      {
        test: /\.css$/,
        use: [
          //   {
          //     loader: "style-loader", // style-loader 把css插入到head的标签中
          //     options: {
          //       insertAt: "top" //将插入的样式至于html顶部 ，自己在html内插入的文件内样式可以优先级更高
          //     }
          //   },
          MiniCssExtractPlugin.loader,
          "css-loader", // css-loader 连续 @import这种语法
          "postcss-loader" //用于加css样式前缀的
        ]
      },
      {
        // 安装 less-loader和 less
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", // css-loader 连续 @import这种语法
          "postcss-loader", //用于加css样式前缀的
          "less-loader" // 把less转换成css  优先级
        ]
      },
      {
        // 安装 less-loader和 less
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", // css-loader 连续 @import这种语法
          "postcss-loader", //用于加css样式前缀的
          "sass-loader" // 把less转换成css  优先级
        ]
      },

      // 5 img
      // {
      //   test:/\.(png|jpg|gif)$/,
      //   use:'file-loader'
      // },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 1,
            outputPath: "img/" // 输出目录
          }
        }
      },
      // 6 处理html中的img
      {
        test: /\.html$/,
        use: "html-withimg-loader"
      }
    ]
  }
};

