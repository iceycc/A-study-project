let fs  =require('fs')

// 异步回调嵌套  会导致代码难以维护， 而且不方便处理错误

// fs.readFile('./1.txt','utf8',function(err,data){
//     fs.readFile('./2.txt','utf8',function(err,data){
//         console.log(data)
//     })
// })


// 多个异步同时执行，再某一个时刻拿到最终的结果

let school = {
}
// 哨兵函数
// function out(){
//     if(Object.keys(school).length === 3) {
//         console.log(school)
//     }
// }
// out()
function after(times,callback){
    return function(){
        if(--times===0){
            callback(school)
        }
    }
}

let out = after(3,function(data){
    console.log(data)
})
fs.readFile('./1.txt','utf8',function(err,data){
    school.name = data
    out()
})
fs.readFile('./2.txt','utf8',function(err,data){
   school.age = data
   out() 
})
fs.readFile('./3.txt','utf8',function(err,data){
    school.address = data
    out()
})
