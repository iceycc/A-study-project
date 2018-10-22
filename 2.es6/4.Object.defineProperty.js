let obj = {};
// 用户获取PI 就打印  获取
// 用户设置Pi 就打印 设置
let temp = 3.14
Object.defineProperty(obj,'PI',{
    // 可枚举的  
    enumerable:true,
    // 可配置的
    configurable:true,
    // 不能重新赋值如果为false
    writable:false,
    get(){
        console.log('获取')
        return temp;
    },
    set(val){
        console.log('设置')
        temp = val;
    }
})
obj.PI = 4
console.log(obj.PI)


let obj = {
    temp:'',
    get PI(){
        console.log('get')
        return this.temp
    },
    set PI(val){
        console.log('set')
        this.temp = val
    }
}
obj.PI = 100