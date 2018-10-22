// deconstruction解构
// 结构数组
let [a,b,c] = [1,2,3]
console.log(a,b,c) // 1 2 3
let [,,e,f='5'] = [2,3,4]
console.log(e,f) // 4 '5'

// 对象的解构
let { length:Len ,age} = { length:3,age:15 }
// console.log(length) // ReferenceError: length is not defined
console.log(Len) // 3
console.log(age) // 15
let [{g},{h},,l] = [{g:1},{h:6},11,10]
console.log(g,h,l)
