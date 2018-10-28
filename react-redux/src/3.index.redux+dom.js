// redux开始  原生js中使用redux呢
// 1.会把对应的功能写成常量
import {createStore} from "redux";

const ADD = "ADD";
const MINUS = 'MINUS';

let initState = {
  number:0
}

function reducer(state =initState,action){
  switch(action.type){
    case ADD:
      return {
        number:state.number + action.count
      }
      break;
    case MINUS:
      return {
        number:state.number - action.count
      }
      break;
  }
  return state
}

let store = createStore(reducer)

let span = document.querySelector(".span")
let btn1 = document.querySelector("#increment")
let btn2 = document.querySelector("#decrement")

span.innerHTML = store.getState().number

store.subscribe(()=>{
  span.innerHTML = store.getState().number
})

btn1.addEventListener('click',function(){
  store.dispatch({
    type:ADD,
    count:1
  })
})

btn2.addEventListener('click',function(){
  store.dispatch({
    type:MINUS,
    count:1
  })
})