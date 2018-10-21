let Promise = require('./promise');

let fs = require('fs');

function read(url) { // ng1.0 Q
  let dfd = Promise.defer()
  fs.readFile(url,'utf8',function (err,data) {
    if(err) dfd.reject(err);
    dfd.resolve(data);
  });
  return dfd.promise;
};
read('age1.txt').then(data=>{
  console.log(data);
}).catch(err=>{
  //console.log(err);
  return Promise.resolve('失败');
})
.finally(()=>{ // es2018
  console.log('123')
}).then(function(data){
  console.log(data);
},function (err) {
  console.log('err',err);
})