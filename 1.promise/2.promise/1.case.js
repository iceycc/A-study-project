let Promise = require('./1.promise')

let p = new Promise(function(resolve,reject){
    resolve('111')
})
p.then(function(value){
    console.log(value)
},function(err){
    console.log(err)
})