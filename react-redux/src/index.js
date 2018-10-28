// import React from "react";
// import {render} from "react-dom"
// import App from "./App"
// render(<App/>,window.root)
// document.write('hello')

let state = {
  title : {
    color:"red",
    text:"标题",
  },
  content:{
    color:"green",
    text:"内容"
  }
}
function renderTitle(){
  let title = document.getElementById('title');
  title.style.color = state.title.color;
  title.innerHTML = state.title.text
}

function renderContent(){
  let content = document.getElementById('content');
  content.style.color = state.content.color;
  content.innerHTML = state.content.text
}
function render(){
  renderTitle();
  renderContent();
}

render()

function dispatch(action){
  switch (action.type){
    case "CHANGE_TITLE_COLOR":
      state = {...state,title:{...state.title,color:action.color}}
      break;
    case "CHANGE_CONTENT_COLOR":
      state = {...state,content:{...state.content,text:action.text}}
      break;
  }
}

// 尽可能把状态保护起来
setTimeout(()=>{
  dispatch({
    type:'CHANGE_TITLE_COLOR',
    color:'blue'
  })
  dispatch({
    type:'CHANGE_CONTENT_COLOR',
    text:'action-内容'
  })
  render()
},1000)