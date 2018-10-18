function Promise(executor){
    let self = this
    // 保存成功带值和失败带原因
    self.value = undefined
    self.reason = undefined
    // 存储成功的回调
    self.onResolveCallbacks = []
    // 存储失败的回调
    self.onRejectedCallbacks = []
    // 存储当前这个promise的状态
    function resolve(value){
        if(self.status ==='pedding'){
            self.value = value
            self.status = 'resolved'
            self.onResovleCallbacks.forEach(function(fn){
                fn()
            })
        }
    }
    function reject(reason){
        if(self.status ==='pedding'){
            self.reason = value
            self.status = 'resolved'
            self.onrejectedCallbacks.forEach(function(fn){
                fn()
            })
        }
    }
    executor(resolve,reject)
}
Promise.prototype.then = function(onFulfilled,onRejected){
    let self = this
    if(self.status ==='resolve'){
        onFulfilled(self.value)
    }
    if(self.status==='reject'){
        onRejected(reason)
    }
    if(self.status === 'pedding'){
        self.onResolveCallbacks.push(function(){
            onFulfilled(self.value)
        })
        self.onRejectedCallbacks.push(function(){
            onRejectedCallbacks(self.reason)
        })
    }
}
module.exports = Promise