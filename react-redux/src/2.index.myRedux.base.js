// 进阶版本的store

function createStore(reducer) {
  let state; // 对外还要暴露state属性，暴露的属性不希望别人更改，就算你更改了也不会影响原来的状态
  let listeners = []
  let getState = () => {
    return JSON.parse(JSON.stringify(state)) // 拷贝新的状态返回
  }
  function dispatch(action) {
    state = reducer(state,action); // reducer 处理完返回一个新的状态 覆盖老的状态
    listeners.forEach(fn=>fn()) // 每次触发dispatch时同时执行发布函数
  }
  dispatch({
    type:'@INIT' // 初始化
  })

  let subscribe=(fn)=>{
    listeners.push(fn);
    return ()=>{
      listeners = listeners.filter(l=>l!=fn)
    }
  }
  return {
    getState,
    dispatch,
    subscribe
  }

}

// 当前的初始值
let initState = {
  title: {
    color: "red",
    text: "标题",
  },
  content: {
    color: "green",
    text: "内容"
  }
}
// 管理员
function reducer(state = initState,action) { // 默认状态
  switch (action.type) {
    case "CHANGE_TITLE_COLOR":
      return {...state, title: {...state.title, color: action.color}}
      break;
    case "CHANGE_CONTENT_COLOR":
      return {...state, content: {...state.content, text: action.text}}
      break;
  }

  return state // 初始化@init不会匹配到就到这里了  第一次将state传入store里
}


// 创建一个
let store = createStore(reducer)

function renderTitle() {
  let title = document.getElementById('title');
  title.style.color = store.getState().title.color;
  title.innerHTML = store.getState().title.text
}



function renderContent() {
  let content = document.getElementById('content');
  content.style.color = store.getState().content.color;
  content.innerHTML = store.getState().content.text
}

function render() {
  renderTitle();
  renderContent();
}
render()

// 先写一个更新函数，先把这个函数保存下来  每次状态改变 我们调用了 dispatch 就执行这个函数
store.subscribe(render)
// 订阅时间执行后返回的是一个取消订阅
let unsubscribe = store.subscribe(function(){
  console.log('状态更新了');
})

// 尽可能把状态保护起来
setTimeout(() => {
  store.dispatch({
    type: 'CHANGE_TITLE_COLOR',
    color: 'blue'
  })
  store.dispatch({
    type: 'CHANGE_CONTENT_COLOR',
    text: 'action-内容'
  })
  // render() // 如何自动更新？dispatch后自动更新
}, 1000)
setTimeout(() => {
  store.dispatch({
    type: 'CHANGE_TITLE_COLOR',
    color: 'pink'
  })
  store.dispatch({
    type: 'CHANGE_CONTENT_COLOR',
    text: 'action-内容111'
  })
  unsubscribe() // 取消订阅
  // render() // 如何自动更新？dispatch后自动更新
}, 2000)

setTimeout(() => {
  store.dispatch({
    type: 'CHANGE_TITLE_COLOR',
    color: 'pink'
  })
  store.dispatch({
    type: 'CHANGE_CONTENT_COLOR',
    text: 'action-内容111'
  })
  // render() // 如何自动更新？dispatch后自动更新
}, 3000)