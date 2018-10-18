function Promise(executor) {
  let self = this;
  // 保存成功的值和失效的原因
  self.value = undefined;
  self.reason = undefined;
  // 保存一下当前这个promise的状态
  self.state = "pending";
  function resolve(value) {
    if (self.state === "pending") {
      self.state = "resolved";
      self.value = value;
    }
  }
  function reject(reason) {
    if (self.state === "pending") {
      self.state = "rejected";
      self.reason = reason;
    }
  }
  executor(resolve, reject);
}
Promise.prototype.then = function(onFulfilled, onRejected) {
  let self = this;
  if (self.state === "resolved") {
    onFulfilled(self.value);
  }
  if (self.state === "rejected") {
    onRejected(self.reason);
  }
};
module.exports = Promise;
