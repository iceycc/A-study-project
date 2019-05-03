"use strict";
// 基本数据类型
var name1 = 'wbycc';
var age = 10;
var isAlive = true;
var x = undefined;
var y = null;
// name1 = null
// naem1 = undefined
// 数组 1 长度任意 2 类型必须是统一的
var names = ['a', 'b', 'c'];
var arr = [1, '2', 3];
// tuple元组 是一个长度和类型确定的数组
var proArr = ['1', 1, true];
// 枚举
var Gender;
(function (Gender) {
    Gender[Gender["BOY"] = 0] = "BOY";
    Gender[Gender["GIRL"] = 1] = "GIRL";
})(Gender || (Gender = {}));
var boy = Gender.BOY;
console.log(boy);
var colors = [2 /* BLUE */, 1 /* YELLOW */, 0 /* RED */];
// any 任意的
// never 永远不
// viod
// window.getData = function(){
// }
// 类型判断
// 包装类
// 联合类型
var lianhe = '1';
// 类型断言
// 字面量联合
// 函数的定义
// 函数声明
function sum(a, b) {
    return a + b;
}
sum(1, 1);
var getUserName = function (f, l) {
    return f + l;
};
getUserName('1', '2');
