# wenpack4 学习笔记

## 一、webpack 介绍

---

### 安装 webpack4

---

本地安装 或 全局安装

- webpack webpack-cli

### webpack 可以进行 0 配置

---

- 打包工具 --输出后的结果
- 0 配置。npx webpack
- `npx webpack`等价于，0 配置下，默认会执行 `node_modules/.bin/webpack`。其实就是等价于 在 script 创建快捷`"dev": "node_modules/.bin/webpack"`键然后`npm run`（npm run 会创建一个新的 shell，执行指定的命令，并将 node_modules/.bin 加入 PATH 变量。当脚本内容结束，则子 shell 关闭，回到父 shell 中。）。
- 支持 js 模块化.
- 默认 mode 为 `production`。dist 目标文件为 `main.js`

## 二、基础进行配置

---

> 特点：插件的执行顺序 从右向左 从下向上 执行。或者在 rules 下的指定插件的上的 use 下的 options 设置 `enforce:'pre'`强制提前执行； `enforce:'post'`在后面执行
> loader 的几种形式：pre 前面执行的 loader；post 后置 loader；normal 普通的 loader； 内联 loader expose；

### 1、 创建配置文件

---

1. 根目录创建`webpack.config.js`。这个默认的，`node_modules/webpack-cli/bin/config-yargs.js`中有配置`defaultDescription: "webpack.config.js or webpackfile.js"`,默认支持两种配置名。
2. 配置模式 入口 出口
   ```javascript
        mode:'development',// 模式 默认两种 product development
        entry:'./src/index.js',// 入口
        output:{
            filename:'js/bundle.js',// 打包后都文件名  js输出目录
            path:path.resolve(__dirname,'dist'),//输出路径必须是一个绝对路径
        },
   ```
3. 可以指定 webpack 执行的配置文件：`npx webpack --config webpack.config.my.js`
4. 快捷启动和更改配置文件的名字：script 配置执行脚本

   ```json
     "scripts":{
       "build":"webpack --config webpack.config.js",
       "build:my":"webpack --config webpack.config.my.js",
     },
   ```

   下面三种启动方式等价

   - 通过`npm run build:my执行`
   - npm 可以传参：`npm run build:my -- --config webpack.config.my.js`,npm run 后面 `--` 后面的表示传人参数
   - `npx webpack --config webpack.config.my.js`

### 2、 开发服务器配置 webpack-dev-server

---

1. 生成一个内存中的打包
2. 生成一个地址
3. 安装 `yarn add webpack-dev-server -D`
4. 启动 `npx webpack-dev-server` 默认在根目录启动
5. 配置启动目录：
   ```JavaScript
       devServer:{ // 开发服务器配置
           port:'3000', // 配置端口
           progress:true, // 显示进度条
           contentBase:'./build', //??
           open:true,
       }
   ```
6. 快捷启动
   ```json
    "scripts": {
        "build": "webpack --config webpack.config.js",
        "dev":"webpack-dev-server --config webpack.config.js"
    },
   ```

### 3、 html 处理

---

```javascript
// 插件数组
new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "index.html",
  minify: {
    // 压缩
    removeAttributeQuotes: true, // 删除双引号
    collapseWhitespace: false // 打包成一行
  },
  hash: true // hash  bundle.js?837d4b66e7e90172246e
});
```

### 4、 样式处理

---

> loader 的特点 希望功能单一

loader 的用法

1. 字符串只有一个 loader
2. 多个 loader 需要 []数组
3. loader 的顺序 默认从右向左,
4. loader 可以写出对象模式

```javascript
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        {
          loader: "style-loader", // style-loader 把css插入到head的标签中
          options: {
            insertAt: "top" //将插入的样式至于html顶部 ，自己在html内插入的文件内样式可以优先级更高
          }
        },
        "css-loader" // css-loader 连续 @import这种语法
      ]
    },
    {
      // 安装 less-loader和 less
      test: /\.less$/,
      use: [
        {
          loader: "style-loader", // style-loader 把css插入到head的标签中
          options: {
            insertAt: "top" //将插入的样式至于html顶部 ，自己在html内插入的文件内样式可以优先级更高
          }
        },
        "css-loader", // css-loader 连续 @import这种语法
        "less-loader" // 把less转换成css  优先级
      ]
    }
    // 安装 sass-loader和 node-sass
    // 安装 stylus-loader和 stylus
  ];
}
```

配置 css 样式抽离

> 默认配置都是之间打包插入到 index.html 的 head 头的 style 内
> 如何抽离到 link 标签呢：抽离 css 样式

1. 安装 `yarn add MiniCssExtractPlugin -D`
2. 配置

   ```javascript
   new MiniCssExtractPlugin({
     filename: "css/main.[hash:8].css", // 可以设置输出目录 css输出目录
     minify: {},
     hash: true // hash  bundle.js?837d4b66e7e90172246e
   });
   ```

3. 字段加前缀 `yarn add postcss-loader autoprefixer -D`

- 需要在根目录创建一个配置文件`postcss.config.js`

```js
module.exports = {
  plugins: [require("autoprefixer")]
};
```

```js
use: [
  MiniCssExtractPlugin.loader,
  "css-loader",
  "postcss-loader",
  "less-loader"
];
```

4. 压缩 css： MiniCssExtractPlugin 管理，下面要有配置项
   npm 地址 `https://www.npmjs.com/package/mini-css-extract-plugin`

- 压缩 css 安装 ： `yarn add optimize-css-assets-webpack-plugin -D` 用了这个插件后 js 的默认压缩会失效 需要 安装`glifyjs-webpack-plugin`
- 压缩 js 安装 ： `yarn add uglifyjs-webpack-plugin -D`

  ```js
    optimization:{ // 优化项
    minimizer:[
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCss()
    ]
  },
  ```

### 5、 js 转换

---

1. es6-es5: 安装 `yarn add babel-loader @babel/core @babel/preset-env -D`
2. es7-es5: 安装 `yarn add @babel/plugin-proposal-class-properties -D`

```js
class A {
  a = 1;
}
```

3. 装饰器 @log : 提示 `decorators-legacy`不支持,

- [文档](https://babeljs.io/docs/en/babel-plugin-proposal-decorators)
- 安装 ：`yarn add @babel/plugin-proposal-decorators -D`

4. 处理 js 语法 `runtime`

- 不会转化 BOM 里面不兼容的 API，比如 Promise,Set,Symbol,Array.from,async 等等的一些 API。这时候就需要 `polyfill` 来转转化这些 API
- 安装 `yarn add @babel/plugin-transform-runtime -D`
- 安装 `yarn add @babel/runtime`
- [文档](https://babeljs.io/docs/en/babel-plugin-transform-runtime#docsNav)
- babel 官网搜索

5. 处理 js 语法 `polyfill`

- 安装 `yarn add @babel/polyfill`
- 会重新实现 `includes`等高级语法
- 页面中直接引入 `require('@babel/polyfill')` 相当于在全局的对象上增加方法。
- 容易污染全局

6. 代码校验 eslint

- 安装 `yarn add eslint`
- 安装 `yarn add eslint-loader -D`
- [官网](https://eslint.org/) 从 demo 可以配置 然后下载配置 文件 放到项目根目录即可。主要文件名前面加点 `.eslintrc.json`

> 配置

```js
rules: [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: "eslint-loader",
      options: {
        enforce: "pre" // 强制提前
      }
    }
  },
  {
    test: /\.js$/,
    use: {
      loader: "babel-loader",
      options: {
        // 用babel-laoder将es6转化为es5
        presets: [
          "@babel/preset-env" //
        ],
        plugins: [
          // 小插件 针对某些小版本js
          ["@babel/plugin-proposal-decorators", { legacy: true }], // 装饰器转换 注意顺序 再这个
          ["@babel/plugin-proposal-class-properties", { loose: true }][ // es7-es5 注意顺序 先这个
            ("@babel/plugin-transform-runtime", //
            {
              corejs: false,
              helpers: true,
              regenerator: true,
              useESModules: false
            })
          ]
        ]
      }
    }
  }
];
```

### 6、全局变量引入问题

---

引入 jquery 的方法

- 1、文件内直接引入

```js
import $ from "jquery";
console.log("$ >>", $);
console.log("window.$ >>", window.$);
```

- 2、expose-loader 暴露到 window 上
  先安装 `yarn add expose-loader -D`  
  方法 1:直接再 main.js 入口文件挂载

```js
// 将 $ 挂载在全局 expose-loader?$!jquery ，其中$可以自定义
import $ from "expose-loader?$!jquery";
console.log("$ >>", $);
console.log("window.$ >>", window.$);
```

方法 2:在配置文件的 rules 中配置

```js
rules: [
  {
    test: require.resolve("jquery"),
    use: "expose-loader?$"
  }
];
```

- 3、ProvidePlugin 在每个模块注入 \$

以上都是要通过 `window.$` 才能获取到\$。如何在各个模块直接获取到 `$`呢
通过 webpack 的插件：ProvidePlugin

```js
webpacklet webpack = require('webpack')

plugin:[
  new webpack.ProvidePlugin({
    $:'jquery'
  })
]
```

- 4、 cdn 引入不打包
  为防止引入 cdn 链接后再引入 jquery 模块造成 jquery 重复打包，可以使用`externals`

```js
  externals:{
    // 外部引入的不需要打包
    jquery:'$'
  },
```

### 7、 图片处理

---

1. 在 js 中创建图片来引入
   安装：`yarn add file-loader -D` 实际上不会用这个的
   安装: `yarn add url-loader -D` 实际用这个 可以根据大小设置 base64

```js
rules: [
  // {
  //   test: /\.(png|jpg|gif)$/,
  //   use: "file-loader"
  // },
  {
    test: /\.(png|jpg|gif)$/,
    use: {
      loader: "url-loader",
      options: {
        limit: 200 * 1024,
        outputPath: "img/", // image输出目录
        publicPath: "/" // 单独设置图片
      }
    }
  }
];
```

2. 在 css 引入 background('url')
   cssl-loader 都已经默认处理好来

```css
img {
  background: red url("./logo.png");
}
```

3. 在 html 中引入 img 标签
   安装 `yarn add html-withimg-loader`

```js
rules: [
  {
    test: /\.html$/,
    use: "html-withimg-loader"
  }
];
```

### 8、设置路径

---

1. 设置输出目录

- css
- js
- img

2. 设置引用路径
   统一设置 css/js/img

```js
  output: {
    filename: "js/bundle.js", //  development 下
    path: path.resolve(__dirname, "dist"), //输出路径必须是一个绝对路径
    // publicPath:'http://icey.cc',// 统一给资源路径设置域名 默认在当前项目根目录下
    // publicPath:'./' ,// css文件中引入的图片就找不到了。需要设置别名
    publicPath:'/' // 项目直接放在站点根目录没问题，但是放到子目录下会出问题。宗上建议统一设置别名
  },
```

单独出来图片

```js
  {
    test: /\.(png|jpg|gif)$/,
    use: {
      loader: "url-loader",
      options: {
        limit: 200 * 1024,
        outputPath: "img/", // image输出目录
        publicPath: "/" // 单独设置图片
      }
    }
  }
```

## 三、 配置

### 多页面配置

---

安装：`yarn add webpack webpack-cli -D`

```js
let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  // 多入口
  mode: "development",
  entry: {
    home: "./src/index.js",
    other: "./src/other.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "home.html",
      chunks: ["home"]
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "other.html",
      chunks: ["other"]
    })
  ]
};
```

### 配置 source-map

```js
  // 1) 源码映射 会单独生成一个sourcemap文件 出错了 会标识 当前报错的列和行 大 和 全
  // devtool:'source-map', // 增加映射文件 可以帮我们调试源代码
  // 2) 不会产生单独的文件 但是可以显示行和列
  // devtool:'eval-source-map',
  // 3)  不会产生列 但是是一个单独的映射文件
  // devtool:'cheap-module-source-map', // 产生后你可以保留起来
  // 4) 不会长生文件 集成在打包后的文件中 不会产生列
   devtool:'cheap-module-eval-source-map',
```

### 配置实时打包 watch

监控代码改变就进行打包

```js
  watch:true,
  watchOptions:{ // 监控的选项
    poll:1000, // 每秒 问我 1000次
    aggregateTimeout:500, // 防抖 我一直输入代码
    ignored:/node_modules/ // 不需要进行监控哪个文件
  },
```

### webpack 小插件

1. CleanWebpackPlugin 清空
   删除文件夹 `yarn add clean-webpack-plugin -D`

```js
let CleanWebpackPlugin = require("clean-webpack-plugin");
plugins: [new CleanWebpackPlugin(["dist"])];
```

2. CopyWebpackPlugin  
   复制文件夹 `yarn add copy-webpack-plugin -D`

   ```js
   let CopyWebpackPlugin = require("copy-webapck-plugin");
   plugins: [
     new CopyWebpackPlugin([{ form: "./docs", to: "docs" }])
     // to:默认复制到dist目录下
   ];
   ```

3. webpack.BannerPlugin
   版权声明 `yarn add webpack -D`
   ```js
   plugins: [new webpack.BannerPlugin("make 2019 by icey")];
   ```

### webpack 跨域问题

#### 方法一、二 客户端代理配置

```js

// ============ 服务端 server.js
//... 监听端口 3000
let express = require('express')
let app = express()
let webpack = require('webpack')
// app.get('/api/user',(req,res)=>{
//   res.json({name:'王冰洋'})
// })
// app.get('/user',(req,res)=>{
//   res.json({name:'王冰洋'})
// })
app.listen(3000,()=>{
  console.log('3000 Ready');
})

// ============ 客户端 index.js
// ...本地服务启动端口：8080 凡事含api的都进行代理
let xhr = new XMLHttpRequest();
xhr.open('GET','/api/user',true);
xhr.onload = function(){
    console.log(xhr.response)
}
xhr.send();

// ============代理 webpack.config.js
devServer:{
    // 1）方法一
    // proxy:{
    //   '/api':{
    //     target:'http://localhost:3000',
    //     pathRewrite:{
    //       '/api':''
    //     }
    //   }
    // }
    // 2）方法二 前端单纯的临时模拟数据
    before(app){ // 提供的方法钩子
      app.get('/api/user',(req,res)=>{
        res.json({name:'王冰洋111aaa'})
      })
    },
    // 3)方法三 见下面 有服务端 不用用代理来处理 能不能在服务端中启动webpack 端口用服务端端口
    // 需要安装`webpack-dev-middleware` 用于支持webpack在服务端运行
}

```

#### 方法三 服务端配置

服务端代理的方法需要安装 `webpack-dev-middleware`

```js
let express = require("express");
let app = express();
let webpack = require("webpack");
// 引入中间件
let middle = require("webpack-dev-middleware");
// 引入webpack配置
let config = require("./webpack.config");
// 编译webpack配置
let compiler = webpack(config);
// 通过middle中间件，在启动服务端时，同时在同一端口启动客户端，使端口相同解决跨域
app.use(middle(compiler));

app.get("/user", (req, res) => {
  res.json({ name: "王冰洋" });
});
app.listen(3000, () => {
  console.log("http://localhost:3000 Ready");
});
```

### resolve 属性配置

---

1. 设置别名
2. 指定查找目录
3. 自动添加拓展名、

```js
// index.js
import './style'; // 无拓展名 自动检索
import 'bootstrap'; // 我们想要引入的是css 但是直接这么引入 默认这样引入的是js 需要配置别名 将 boostrap指向 bootstrap/dist/css/bootstrap

// webpack.config.js
    modules:[path.resolve('node_modules')], // 指定模块路径
    mainFields:['style','main'],// 指定第三方包的查找入口文件的路径 先找style 再找 main
    mainFiles:[],// 入口文件的名字
    extensions:['.js','.css','.json','.vue'],// 不加后缀名。自动搜索
    alias:{ // 别名 vue vue.runtime
      bootstrap:'bootstrap/dist/css/bootstrap.css'
    }
```

### 定义环境变量

---

使用的是 webpack 的内置插件

```js
// index.js
if (DEV == "development") {
  // todo
} else {
  // todo
}
// 配置环境变量
new webpack.DefinePlugin({
  // DEV:"'development'", // console.log('dev') 可以加双引号、
  DEV: JSON.stringify("production"), // 或者用JSON.stringify
  FLAG: "true", // 布尔值不需要
  expression: "1+1" // 数值相加的话如果想要结构的话不能JSON.stringify，JSON.stringify会把字符串传人
});
```

实际情况要分两个文件进行开发和生产的分别配置

- 安装：`yarn add webpack-merge -D`何必配置

```js
// ====== webpack.base.js
let path = require("path");
let webpack = require("webpack");
module.exports = {
  entry: { home: "./src/index.js" },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: []
};
// ====== webpack.dev.js
let { smart } = require("webpack-merge");
let base = require("./webpack.base");
module.exports = smart(base, {
  mode: "development",
  devServer: {},
  devtool: "source-map"
});
// ====== webpack.prod.
let { smart } = require("webpack-merge");
let base = require("./webpack.base.js");

module.exports = smart(base, {
  mode: "production",
  optimization: {
    minimizer: []
  },
  plugins: []
});
```

## webpack 优化

---

安装`yarn add webpack webpack-cli html-webpack-plugin @babel/core babel-loader @babel/preset-env @babel/preset-react -D`

1. noPase:例如 jquery，其实 jq 是个独立的库，不需要别的依赖，在打包时默认会进行解析是否需要引入其他模块，浪费时间。可以 noPase 忽略，不去解析其中的依赖库
2. exclude 和 include

```js
module:{
  noParse:/jqurey/,// 不去解析jquery中的依赖库
  rules:[
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排出和包含
        include: path.resolve('src'), // 排出和包含
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins:[
              '@babel/plugin-syntax-dynamic-import'
            ]
          }
        }
      },
  ],
}
```

3. IgnorePlugin:
   moment 会自动引入`./locale/`全部的语言包，可以忽略全部的语言包，按需引入有用的语言包
   手动引入 `import 'moment/locale/zh-cn'`

```js
plugins: [
  new webpack.IgnorePlugin(/\.\/locale/, /moment/) // 忽略语言包，需要手动import对应的语言包 import 'moment/locale/zh-cn'
];
```

4. 动态连接库 dllPlugin: output 中设置 library 和 libraryTarget
   会将打包后的文件通过某一种规范声明称变量，暴露出去
   > manifest.json 任务清单

```js
// ===== webpack.dll.js  专门打包静态类库文件的配置
let path = require("path");
let webpack = require("webpack");
module.exports = {
  mode: "development",
  entry: {
    react: ["react", "react-dom"] // 单独打包大的类库文件
  },
  output: {
    filename: "_dll_[name].js", // 产生的文件名
    path: path.resolve(__dirname, "dist"),
    library: "_dll_[name]" // _dll_react 出的变量就什么名
    //libraryTarget:'var' // commonjs var this umd....
  },
  plugins: [
    new webpack.DllPlugin({
      // name == library
      name: "_dll_[name]",
      path: path.resolve(__dirname, "dist", "manifest.json")
    })
  ]
};

// ==== webpack.config.js 配置先从manifest.json招对应的类库，找不到再进行打包
plugins: [
  new webpack.DllReferencePlugin({
    manifest: path.resolve(__dirname, "dist", "manifest.json") //
  })
];
```

5. Happypack 多线程打包

`yarn add happypack -D`

```js
// 引入插件
let happypack = require('happypaclk')
// 配置
plugins: [
  new happypack({
    id: "css",
    use: ["style-loader", "css-loader"]
  }),
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
],
module:{
  rules:[
    {
      test:/\.css$/,
      use:'happypack/loader?id=css'
    },
        {
      test:/\.js$/,
      use:'happypack/loader?id=js'
    }
  ]
}
```

### webpack 自带优化

---

1. tree-shaking：import 在生产环境下 会自动去除掉没用的代码。require 的无效
2. es6 模块会把 require 的结果放到 defalut 上 ，require 不支持 tree-shaking

```js
let calc = require("./test");
console.log(calc.default.sum(1, 2));
```

3. cope hosting 作用域提升

```js
let a = 1;
let b = 2;
let c = 3;
let d = a + b + c; // 在webpack中自动省略 可以简化的代码 webpack生产模式 这些无用声明会省略 直接输出6
console.log(d, "-------------");
```

### 抽离公共代码

splitChunks  
 需要是多页面应用，抽离公共模块

```js
  optimization:{ // 原来叫commonChunkPlugins
    splitChunks:{ // 分割代码块
      cacheGroups:{ // 缓存组
        common:{ // 公共的模块
          chunks:'initial',
          minSize:0, // 公共文件大小
          minChunks:2, // 复用几次以上就抽离
        },
        vendor:{ // 第三方的
          priority:1, // 增加权重 先抽离第三方模块
          test:/node_modules/, // 把你抽离出来
          chunks: 'initial',
          minSize: 0,
          minChunks: 2
        }
      }
    }
  },
```

### webpack 懒加载
vue路由懒加载，react路由懒加载
`@babel/plugin-syntax-dynamic-import`

```js
// index.js
let button = document.createElement("button");
button.innerHTML = "按钮";
button.addEventListener("click", function() {
  //  es6 草案中的语法 jsonp实现动态加载文件
  import("./source.js").then(() => {
    console.log('source',data.default) // wbywby
  });
});

// source.js
export default 'wbywby'
```

```js
// webpack.config.js
plugins: ["@babel/plugin-syntax-dynamic-import"];
```

### 热更新
组件更新 不刷新页面进行更新。增量更新
```js
// 1.
  devServer: {
    hot:true, //  启用热更新
    port: 3000,
    open: true,
    contentBase: './dist'
  },

  // 2.配置
    new webpack.NamedModulesPlugin(), // 哪个模块更新了打印更新的模块路径

    new webpack.HotModuleReplacementPlugin() // 热更新插件

```

```js
// 页面
if(module.hot){
  module.hot.accept('./source',()=>{
    console.log('文件更新')
    let str = require('./source')
    console.log(str)

  })
}
```

## tapable
---
### tapable介绍
webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是tapable。tapabel有点类似于nodejs的event库，核心原理也是依赖于发布订阅模式。
```js
// Compiler.js
const {
	Tapable,
	SyncHook,
	SyncBailHook,
	AsyncParallelHook,
	AsyncSeriesHook
} = require('tapable)
```

### 原理略 todo代补充
