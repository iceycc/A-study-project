// function after(times,callback){
//     return function(){
//         if(--times === 0){
//             callback()
//         }
//     }
// }

// let fn = after(3,function(){
//     console.log('fn 被调用了三次了')
// })
// fn()
// fn()
// fn()

// function read(callback){
//     setTimeout(()=>{
//         let r = '1111'
//         callback(r)
//     },3000)
// }

// read(function(r){
//     console.log(r)
// })

let fs = require("fs");

fs.readFile("./1.txt", "utf8", function(err, data) {
  if (err) throw new Error(err);
  console.log(data);
});
