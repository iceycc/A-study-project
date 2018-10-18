let Promise = require('./2.promise')
let p = new Promise(function(resolve,reject){
    setTimeout(()=>{
        reject('11')
    },1000)
})

p.then(function(value){
    console.log('value',value)
},function(err){
    console.log('err',err)
})

p.then(function(value){
    console.log('value',value)
},function(err){
    console.log('err',err)
})

p.then(function(value){
    console.log('value',value)
},function(err){
    console.log('err',err)
})