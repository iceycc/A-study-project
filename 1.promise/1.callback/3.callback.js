let fs = require('fs')
// 发布订阅模式  先把需要的订阅的内容保存到队列里  当发布时让数组到函数依次执行即可
let school = {}
let Dep = {
    arr:[],
    on(fn){
        this.arr.push(fn)
    },
    emit(){
        if(Object.keys(school).length ===3){
            this.arr.forEach(function(fn){
                fn()
            })
        }
    }
}
// 订阅
Dep.on(function(){
    console.log(school)
})
Dep.on(function(){
    console.log('代码执行了')
})
// 发布
fs.readFile('./1.txt','utf8',function(err,data){
    school.name = data
    Dep.emit()
})
fs.readFile('./2.txt',function(err,data){
    school.age = data
    Dep.emit()
})
fs.readFile('./3.txt','utf8',function(err,data){
    school.address = data
    Dep.emit()
})