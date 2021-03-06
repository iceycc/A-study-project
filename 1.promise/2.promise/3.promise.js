function Promise(executor) {
  let self = this;
  self.value = undefined;
  self.reason = undefined;
  self.onResolveCallbacks = [];
  self.onRejectCallbacks = [];
  self.status = "pedding";
  function resolve(value) {
    if (self.status === "pedding") {
      self.status = "resolved";
      self.value = value;
      self.onResolveCallbacks.forEach(function(fn) {
        fn();
      });
    }
  }
  function reject(reason) {
    if (self.status === "pedding") {
      self.status = "rejected";
      self.reason = reason;
      self.onRejectCallbacks.forEach(function(fn) {
        fn();
      });
    }
  }

  executor(resolve, reject);
}

function resolvePromise(x, promise, resolve, reject) {


  console.log(3121)
    
}
Promise.prototype.then = function(onFulfilled, onRejected) {
  let self = this;
  debugger
  let promise2 = new Promise(function(resolve, reject) {
    if (self.status === "resolved") {
      let x = onFulfilled(self.value); // 接受返回值
console.log(3131212121)

      // resolvePromise(x, promise2, resolve, reject);
    }
    if (self.status === "rejected") {
      // 获取then中成功或者失败后函数的执行结果
      // 看一看是promis吗
      // 是promse 就让promise执行，取得这个promise执行结果 让返回的promise成功或者失败
      // 如果x是普通值就让这个返回的promise 变成成功态
      let x = onRejected(self.reason);
      resolvePromise(x, promise2, resolve, reject);
    }
    if (self.status === "pedding") {
      self.onResolveCallbacks.push(function() {
        let x = onFulfilled(self.value);
        resolvePromise(x, promise2, resolve, reject);
      });
      self.onRejectCallbacks.push(function() {
        let x = onRejected(self.resaon);
        resolvePromise(x, promise2, resolve, reject);
      });
    }
  });
  return promise2
};

module.exports = Promise;
