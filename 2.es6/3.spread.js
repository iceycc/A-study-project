// spread 展开
let obj1 = {name:'wby',age:26}
let obj2 = {address:'首经贸'}
// 拷贝 合并  $.extend
let pep = {...obj1,...obj2}
console.log(pep);

let obj = {name:{firstName:'wang',lastName:'bingyang',fn:function(){console.log(this.age)}},age:26}

let newObj1 = {...obj}
console.log(newObj1)

// 深拷贝
// 方法1  
let newObj2 = JSON.parse(JSON.stringify(obj))
console.log(newObj2)

// 方法2 
function deepClone(obj){
    if(obj === null) return null
    if(typeof obj !== 'object') return obj
    if(obj instanceof RegExp) return new RegExp(obj)
    if(obj instanceof Date) return new Date(obj)
    let newObj = new obj.constructor;
    for(let key in obj){
        newObj[key] =deepClone(obj[key])
    }  
    return newObj
}
let newObj3 = deepClone(obj)
console.log(newObj3)

// 对象的展开  es7
let obj_1 = {name:'wby',age:18}
let obj_2 = {address:'回龙观'}
let newObj_1 = Object.assign(obj_1,obj_2) // es5
console.log(newObj_1)
let newObj_2 = {...obj_1,...obj_2} // es7
console.log(newObj_2)
// 数组的展开 es6
let arr1 = [1,2]
let arr2 = [3,4]
let newArr1 = arr1.concat(arr2) // 
console.log(newArr1)
let newArr2 = [...arr1,...arr2] // 
console.log(newArr2)

// 剩余运算符 只能放在函数的最后一个参数
function sum(a,...arg){
    console.log(a)
    return eval(arg.join('+')) // eval可以执行参数
}

let r = sum(1,2,3,4,5,6,7,8)
console.log(r)