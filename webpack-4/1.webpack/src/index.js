// 三种引入图片的方式
// 1 在js中创建图片来引入
// file-loader默认会在内部生成一张图片 到build目录下 
// 把生成的hash名字返回回来
import logo from './logo.png'
console.log(logo)

let image = new Image()
image.src = logo
document.body.appendChild(image)
// 2 在css中引入 background：url
require("./less.less");
    // background: red url('./logo.png');
    // background: red url(require('./logo.png'))
// 3 在html中直接 <img src="" alt=""/>


// // 引入css
// require("./index.css");
// require("./less.less");
// require("./scss.scss");
// // 引入第三方插件
// import $ from 'jquery'
// // import $1 from 'expose-loader?$1!jquery'
// console.log('$ >>',$)
// console.log('window.$ >>',window.$)
// // console.log('window.$1 >>',window.$1)
// // 模块化
// let str1 = require("./a.js");

// console.log(str1 + 1);
// let fn1 = x => {
//   console.log(x + 1);
// };
// fn1("aaa");

// @log
// class A {
//   // new A()  a = 1
//   a = 1;
// }
// let a = new A();
// console.log(a.a);

// function log(){

// }