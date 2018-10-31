import * as types from '../action-type'


// 将redux中的属性映射成组件的状态
// 一般action是一个对象  我们用一个函数来创建action  这个函数叫做actionCreator
let actions = {
  add(count){
    return {type:types.ADD,count}
  },
  minus(count){
    return {type:types.MINUS,count}
  }
}

export default  actions