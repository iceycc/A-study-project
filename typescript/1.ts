// 数据类型
let myName:string = 'wangbingyang'
let age:number = 11
let flag:boolean = true
// 数组
let movies:string[] = ['蝙蝠侠','海王']
let tvShow:Array<string> = ['']
let obj:Array<object> = [{name:'wby'}]
let obj2:Array<string|boolean> = ['1',false]
// 元数组
let orginArr:[string,boolean,number] = ['豆瓣',false,3]
// 枚举
enum sexy  {
    BOY = '男',
    GIRL = '女'
}
console.log(sexy.BOY)

enum orderStatus {
    WAIT_FOR_PAY='待支付',
    UNDELIVEDED= '完成支付，待发货'
}

// let btn = document.querySelector('#btn')
// btn.style.color = 'red'
// btn!.style!.color = 'green'  // 强制断言
// let person:any = 'wby'

// null undefined类型
let str:(string|number|null|undefined)

str = 1
// str = [aa]
str = '1'
str = null
str = undefined

function sayHello(name:string):void{
    console.log('hello' + name)
    // return 'end'  // void禁止返回
}
sayHello('wby')

