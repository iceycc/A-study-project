// 1 高阶函数  函数参数是函数 函数返回是函数

// AOP

Function.prototype.before = function(fn){
    let that = this;
    return function (){
        fn()
        that()
    }
}

let fn = function(){
    console.log('old---')
}

let newFn = fn.before(function(){
    console.log('new---')
})

newFn()

// lodash
function after(times,callback){
    // 把times保存在当前作用域
    return function(){
        
    }
}
let fn = after(2,function(){

})

// 什么场景应用