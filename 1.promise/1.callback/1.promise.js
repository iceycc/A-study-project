// 1 回调地狱   2 多个异步请求再同一时间合并结果

let p = new Promise(function(resolve, reject) {
  resolve("有钱人");
  reject("没钱");
});
p.then(
  function(val) {
    console.log("sucssess", val);
  },
  function(err) {
    console.log("fail", err);
  }
);
// 1. Promise承诺 就是一个类型
// 2 new Promise 时需要传递一个executor执行器  （同步执行的）
// 3 executor中有两个参数 reslove和reject
// 4 每个promise实例上都有一个then方法，then中有两个函数
// 5 promise有三种状态
// pendding态 resovled态  rejected态
// pending-》resovled态
// pending-》rejcted态
// resolved和rejected态无法相互转换

let fs = require("fs");

let school = [];

fs.readFile("./1.txt", "utf8", function(err, data) {
  if (err) throw new Error(err);
  school.push(data);
  fs.readFile("./2.txt", "utf8", function(err, data) {
    if (err) throw new Error(err);
    school.push(data)
    console.log(school)
  });
});


let fs = require("fs");
let read = function(url,encoding = 'utf8'){
    return new Promise(function(resolve,reject){
        fs.readFile(url,encoding,function(err,data){
            if(err) reject('出错了')
            resolve(data)
            // reject('出错了')

        })
    })
}
// 1 then执行完全会判断返回的结果  如果promise执行 会取得它的结果
// 2 每次调用then方法后 会返回一个全新的promise，不是this
// 3 promise链式调用  解决了回调嵌套的问题
// 4 值得穿透
// 5 then中返回promise 会把promise的结果作为下一个then的参数
// 6 then返回一个普通值 把这个普通作为下一次的then的成功的结果
// 7 如果then方法抛出异常会走下一次then的失败的回调
read('./1.txt').then((res)=>{
    console.log(res)
},err=>{
    console.log('err1>>',err)
    return Promise.reject(err)
}).catch(err=>{
    console.log('catch>>',err)
})
.then().then().then().then((res)=>{
    throw new Error('error出错')
}).then(null,(err)=>{
    console.log('error出错')
})

Promise.all([read('./1.txt'),read('./2.txt')]).then(function(data){
    console.log(data)
})