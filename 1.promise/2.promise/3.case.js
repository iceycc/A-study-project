let Promise = require('./3.promise')
let p = new Promise(function(resolve,reject){
    resolve()
})

p.then(function(){
    return 100
}).then(function(data){
    console.log(data)
})