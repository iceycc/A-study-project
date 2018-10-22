// 生成器 generator
// async + await
//什么是迭代器

function * gen(){
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
}

let it = gen()
console.log(it)
let flag = false
let index = 0
do{
    index++
    let {value,done} = it.next(index)
    flag = done
    console.log(value,done)
}while(!flag)


let obj = {
    name:'a',
    age:'22',
    [Symbol.iterator]:function(){

    }
}
let arr = [1,3,4,5,6,7]
console.log([...arr])
console.log(...arr)

let arr = [1,3,4,5,6,7]
function f(x,y,z){
    console.log(arguments)
}

// f.apply(null,arr)
f(...arr)
// 1 复制数组
let a1 = [1,3]
let a2 = [...a1]
let [...a3] = a1
console.log(a2)
console.log(a3)
// 2 链接数组
console.log(a1.concat(a2,a3))
console.log([...a1,...a2,...a3])


let likeArr = {
    0:1,1:2,2:3,length:3,
    [Symbol.iterator]:function * (){
        let index = 0;
        while(index!==this.length){
            yield this[index++]
        }
    }
}
// let arr = Array.from(likeArr)
console.log([...likeArr])