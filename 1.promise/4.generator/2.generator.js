function* gen(s){
    console.log('start>>',s);
    let a = yield 1;
    console.log('a>>',a);
    let b = yield 2;
    console.log('b>>',b);
    let c = yield 3;
    console.log('c>>',c)
}

let it = gen(1000);
console.log(it.next(111)); // 第一次传值无效  上面的1000传入到s

console.log(it.next(222)); // 第二次传给第一个yield到返回值

console.log(it.next(333)); // 第三次传给第二个yield到返回值

console.log(it.next(444)); // 第四次传给第三个yield到返回值  此时  it.next(444).done == true ,结束

// start>> 1000
// { value: 1, done: false }
// a>> 222
// { value: 2, done: false }
// b>> 333
// { value: 3, done: false }
// c>> 444
// { value: undefined, done: true }

let fs = require('fs');
let bluebird = require('bluebird')
let read = bluebird.promisify(fs.readFile)
function * r(){
    let name = yield read('./1.txt','utf8')
    console.log(name)
    let age = yield read(name,'utf8')
    console.log(age)
    let adress = yield read(age,'utf8')
    console.log(adress)
    return adress
}
// let co = require('co')
function co(it){
    return new Promise((resolve,reject)=>{
        function next(data){
            let {value,done} = it.next(data)
            if(!done){ //  如果还能继续迭代
                // 调用这个promise， 将执行的结果传递下去
                value.then(data=>{
                    next(data);
                },reject)
            }else{
                resolve(value)
            }
        }
        next()
    })
}
// let o = r()
// let {value,done} = o.next()
// value.then(data=>{
//     console.log('a',data)
//     let {value,done} = o.next(data)
//     value.then(data=>{
//     console.log('b',data)
//         let {value,done} = o.next(data)
//         value.then(data=>{
//             console.log('c',data)
//         })
//     })

// })

co(r()).then(data=>{
    console.log('迭代器执行玩了',data)
})

