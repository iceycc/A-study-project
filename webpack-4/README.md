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
           contentBase:'./build'
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

## 三、 多页面应用配置

---
