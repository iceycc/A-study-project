import React from 'react';
import store from '../store'
import action from '../store/action/Counter'
// import * as types from '../store/action-type'
// // 将redux中的属性映射成组件的状态
// // 一般action是一个对象  我们用一个函数来创建action  这个函数叫做actionCreator
// let action = {
//   add(count){
//     return {type:types.ADD,count}
//   },
//   minus(count){
//     return {type:types.MINUS,count}
//   }
// }

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
              store.dispatch(action.add(1))
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
              store.dispatch(action.minus(1))
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