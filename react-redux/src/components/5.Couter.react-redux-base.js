import React from 'react';
import {createStore} from 'redux';

const ADD = 'ADD';
const MINUS = 'MINUS';

// 初始化仓库
let initState = {
  number: 0
}
// 管理员
function reducer(state = initState, action) {
  switch (action.type) {
    case ADD:
      return {number: state.number + action.count}
      break;
    case MINUS:
      return {number: state.number - action.count}
      break;
  }
  return state
}

let store = createStore(reducer)
window.store = store // 在控制台打印store.getState()，可用于调试。看看state是否改变呢


// 将redux中的属性映射成组件的状态
export default class Counter extends React.Component {
  state = {
    number: store.getState().number
  }
  //
  componentWillMount(){
    // 订阅个事件 state一改变，就更新页面数据
    // unsubscribe用于销毁该订阅
    this.unsubscribe = store.subscribe(()=>{
      this.setState({
        number:store.getState().number
      })
    })
  }
  //
  componentWillUnmount(){
    this.unsubscribe()
  }

  render() {
    return (
        <div>
          <button onClick={
            () => {
              store.dispatch({
                type: ADD,
                count: 1
              })
              // 状态改变后可以很low的用setState更新数据
              // this.setState({
              //   number:store.getState().number
              // })
            }
          }>+
          </button>
          <p>
            {/*{store.getState().number}*/}
            {/*转换成状态*/}
            {this.state.number}
          </p>
          <button onClick={
            () => {
              store.dispatch({
                type: MINUS,
                count: 1
              })
              // 状态改变后可以很low的用setState更新数据
              // this.setState({
              //   number:store.getState().number
              // })
            }
          }>+
          </button>
        </div>
    )
  }
}