"use strict";
// 数据类型
var myName = 'wangbingyang';
var age = 11;
var flag = true;
// 数组
var movies = ['蝙蝠侠', '海王'];
var tvShow = [''];
var obj = [{ name: 'wby' }];
var obj2 = ['1', false];
// 元数组
var orginArr = ['豆瓣', false, 3];
// 枚举
var sexy;
(function (sexy) {
    sexy["BOY"] = "\u7537";
    sexy["GIRL"] = "\u5973";
})(sexy || (sexy = {}));
console.log(sexy.BOY);
var orderStatus;
(function (orderStatus) {
    orderStatus["WAIT_FOR_PAY"] = "\u5F85\u652F\u4ED8";
    orderStatus["UNDELIVEDED"] = "\u5B8C\u6210\u652F\u4ED8\uFF0C\u5F85\u53D1\u8D27";
})(orderStatus || (orderStatus = {}));
// let btn = document.querySelector('#btn')
// btn.style.color = 'red'
// btn!.style!.color = 'green'  // 强制断言
// let person:any = 'wby'
// null undefined类型
var str;
str = 1;
// str = [aa]
str = '1';
str = null;
str = undefined;
function sayHello(name) {
    console.log('hello' + name);
    // return 'end'  // void禁止返回
}
sayHello('wby');
