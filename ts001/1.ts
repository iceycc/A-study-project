// 基本数据类型
let name1:string = 'wbycc' 
let age:number = 10
let isAlive:boolean = true
let x:undefined = undefined
let y:null = null
// name1 = null
// naem1 = undefined

// 数组 1 长度任意 2 类型必须是统一的

let names:string[] = ['a','b','c']
let arr:Array<any> = [1,'2',3]

// tuple元组 是一个长度和类型确定的数组
var proArr:[string,number,boolean] = ['1',1,true]
// 枚举
enum Gender{
   BOY,
   GIRL
}
let boy:number = Gender.BOY
console.log(boy)
// 常数枚举
const enum Color {
  RED,
  YELLOW,
  BLUE
}
var colors = [Color.BLUE,Color.YELLOW,Color.RED];

// any 任意的

// never 永远不

// viod
// window.getData = function(){

// }

// 类型判断

// 包装类

// 联合类型
let lianhe:string| number = '1'

// 类型断言

// 字面量联合

// 函数的定义
// 函数声明
function sum(a:number,b:number):number{
  return a+b
}
sum(1,1)

// 函数的表达式
type GetUserName = (x:string,y:string) => string;
let getUserName:GetUserName = function(f,l){
  return f + l
}
getUserName('1','2')