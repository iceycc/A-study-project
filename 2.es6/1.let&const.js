// var 变量提升 let const不会
// let不能重复声明
// let 不会污染全局作用域

// for(var i=0;i<100;i++){
//    (function(i){
//     setTimeout(()=>{
//         console.log(i)
//     },1)
//    })(i)
// }

// for(let i=0;i<100;i++){
//     setTimeout(()=>{
//         console.log(i)
//     })
// }


// const
const obj = {a:1}
// obj = 2 // Assignment to constant variable.
// obj = { a:2} // Assignment to constant variable.
obj.a = 2
console.log(obj);
