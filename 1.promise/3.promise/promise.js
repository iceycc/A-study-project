function Promise(executor) {
    let self = this;
    self.value = undefined;
    self.reason = undefined;
    self.status = 'pending';
    self.onResolevdCallbacks = [];
    self.onRejectedCallbacks = [];
    function resolve(value) {
      if(self.status === 'pending'){
        self.value = value;
        self.status = 'resolved';
        self.onResolevdCallbacks.forEach(fn => {
          fn();
        });
      }
    }
    function reject(reason) {
      if (self.status === 'pending') {
        self.reason = reason;
        self.status = 'rejected';
        self.onRejectedCallbacks.forEach(fn => {
          fn();
        });
      }
    }
    try{
      executor(resolve, reject)
    }catch(e){
      console.log(e);
      reject(e);
    }
  }
  function resolvePromise(promise2,x,resolve,reject) {
    if(promise2 === x){
      return reject(new TypeError('循环引用'));
    }
    let called;
    if(x!== null && (typeof x === 'object' || typeof x === 'function')){
      try{
        let then = x.then; // getter定义的
        if(typeof then === 'function'){
          // 这个逻辑可能是别人promise 可能既能调用成功也会调用失败
          then.call(x,function (y) {
            if(!called){ // 不让用户既调用成功又调用失败
              called = true
            }else{
              return
            }
            // y可能还是一个promise,需要递归直到是一个常量为止
            resolvePromise(promise2,y,resolve,reject);
          },function (r) {
            if (!called) {
              called = true
            } else {
              return
            }
            reject(r);
          });
        }else{ // {THEN:123}
          if (!called) {
            called = true;
          } else {
            return
          }
          resolve(x);
        }
      }catch(e){
        if (!called) {
          called = true;
        } else {
          return
        }
        reject(e);
      }
    }else{
      resolve(x);
    }
  }
  Promise.prototype.then = function (onFulfilled,onRejected) {
    onFulfilled = typeof onFulfilled == 'function' ? onFulfilled : function (data) {
      return data;
    }
    onRejected = typeof onRejected === 'function' ? onRejected:function (err) {
      throw err;
    }
    let self = this;
    let promise2 = new Promise(function(resolve,reject){
      if(self.status === 'resolved'){
        setTimeout(() => {
          try{
            let x = onFulfilled(self.value);
            resolvePromise(promise2, x, resolve, reject);
          }catch(e){
            reject(e);
          }
        }, 0);
      }
      if (self.status === 'rejected'){
        setTimeout(() => {
          try{
            let x = onRejected(self.reason);
            resolvePromise(promise2, x, resolve, reject);
          }catch(e){
            reject(e);
          }
        },0)
      }
      if(self.status === 'pending'){
        self.onResolevdCallbacks.push(function(){
          setTimeout(() => {
            try{
              let x = onFulfilled(self.value);
              resolvePromise(promise2, x, resolve, reject);
            }catch(e){
              reject(e);
            }
          }, 0);
        });
        self.onRejectedCallbacks.push(function () {
          setTimeout(() => {
            try{
              let x = onRejected(self.reason);
              resolvePromise(promise2, x, resolve, reject);
            }catch(e){
              reject(e);
            }
          }, 0)
        })
      }
    });
    return promise2;
  }
  Promise.prototype.catch = function(errFn){
      // cath就是特殊的then方法
      return this.then(null,errFn)
  }
  Promise.reject = function(reason){
      return new Promise((resolve,reject)=>{
          reject()
      })
  }
  Promise.resolve = function(value){
      return new Promise((resolve,reject)=>{
          resolve()
      })
  }
  Promise.prototype.finally = function(callback){
    return this.then(function(data){
        return Promise.resolve(callback()).then(()=>data)
    },function(){
        return Promise.reject(callback()).then(()=>data)
    })
  }

  Promise.rece = function(promises){
    return new Promise((resolve,reject)=>{
        for(let i = 0; i<promises.length;i++){
            promises[i].then(resolve,reject)
        }
    })
  }
  Promise.all = function(promises){
      return new Promise((resolve,reject)=>{
          let arr = [];
          let currentIndex = 0;
          function processData(index,val){
              arr[index] = val; // 保存每次的结果
              currentIndex++; // 记录成功次数
              // 如果达到了执行目标就让promise成功
              if(currentIndex === promises.length){
                  resolve(arr)
              }
          }

          for(let i=0;i<promsies.length;i++){
              promises[i].then(function(data){
                  processData(i,data)
              },reject)
          }
      })
  }

Promise.defer  =function(){
   let dfd = {};
   dfd.promise = new Promise((resolve,reject)=>{
        dfd.resolve =resolve;
        dfd.reject = reject;
   }) 
   return dfd
}

  module.exports = Promise;