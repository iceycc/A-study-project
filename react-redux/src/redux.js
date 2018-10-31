function createStore(reducer){
  let state;
  let listeners = [];
  let dispatch = (action) =>{
    // 执行reducer
    state =reducer(state,action);
    // 每次状态更新要重新执行渲染函数
    listeners.forEach(fn=>fn());
  }
  dispatch({type:'@INIT'});
  // 神拷贝当前状态，并返回， 获取状态，不会改变状态
  let getState = ()=>JSON.parse(JSON.stringify(state));
  // 观察者
  let subscribe = (fn)=>{
    listeners.push(fn);
    return ()=>{
      // 返回一个取消订阅的函数  删除的函数
      // 过滤掉和当前订阅函数相同的函数
      listeners = listeners.filter(l=>l!=fn)
    }
  }

  return {
    getState,
    subscribe,
    dispatch
  }
}

let combineReducers = (reducers)=>{
  // todo 合并不同模块的reducers
}


export {
  createStore,
  combineReducers
}