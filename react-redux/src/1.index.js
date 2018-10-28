// 基础版本的 stroe

function createStore() {
  let state = {
    title: {
      color: "red",
      text: "标题",
    },
    content: {
      color: "green",
      text: "内容"
    }
  }
  function dispatch(action) {
    switch (action.type) {
      case "CHANGE_TITLE_COLOR":
        state = {...state, title: {...state.title, color: action.color}}
        break;
      case "CHANGE_CONTENT_COLOR":
        state = {...state, content: {...state.content, text: action.text}}
        break;
    }
  }
  let getState = () => {
    return JSON.parse(JSON.stringify(state))
  }
  return {
    getState,
    dispatch
  }

}

let store = createStore()

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
  render()
}, 1000)