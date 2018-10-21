function Promise(executor) {
  let self = this;
  self.value = undefined;
  self.reason = undefined;
  self.onResolvedCallbacks = [];
  self.onRejectedCallbacks = [];
  self.status = "pending";

  function resolve(value) {
    if (self.status === "pending") {
      self.value = value;
      self.status = "resolved";
      self.onResolvedCallbacks.forEach(function(fn) {
        fn();
      });
    }
  }
  function reject(reason) {
    if (self.status === "pending") {
      self.reason = reason;
      self.status = "rejected";
      self.onRejectedCallbacks.forEach(function(fn) {
        fn();
      });
    }
  }
  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

// 解析链式调用的 （他还要和其他的promise进行结合）
function resolvePromise(x, Promise2, resolve, reject) {
  if (x === Promise2) {
    return reject(new TypeError("循环引用"));
  }
  console.log(x);
  // 如果x是一个函数 或者x是一个对象 就有可能是一个Promise
  if (x !== null && (typeof x === "function" || typeof x === "object")) {
    try {
      let then = x.then;
      if (typeof then == "function") {
        then.call(
          x,
          function(y) {
            resolve(y);
          },
          function(r) {
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      reject(e);
    }
  } else {
    //  普通值
    resolve(x);
  }
}
Promise.prototype.then = function(onFulfilled, onRejected) {
  let self = this;
  let Promise2 = new Promise(function(resolve, reject) {
    if (self.status === "resolved") {
      let x = onFulfilled(self.value);
      resolvePromise(x, Promise2, resolve, reject);
    }
    if (self.status === "rejected") {
      let x = onRejected(self.reason);
      resolvePromise(x, Promise2, resolve, reject);
    }
    if (self.status === "pending") {
      self.onResolvedCallbacks.push(function() {
        let x = onFulfilled(self.value);
        resolvePromise(x, Promise2, resolve, reject);
      });
      self.onRejectedCallbacks.push(function() {
        let x = onRejected(self.reason);
        resolvePromise(x, Promise2, resolve, reject);
      });
    }
  });
  return Promise2
};
module.exports = Promise;
