import counter from './Counter';
import list from  './List'

// redux中有一个方法 合并reducer的 {counter:{number:0},list:[]}{counter:{number:0},list:[]}
// let combineReducers = (reducers)=>{
//
//   return (state={},action)=>{
//     let obj = {}
//     for(let key in reducers){
//       obj[key] = reducers[key](state[key],action)
//     }
//     return obj
//   }
// }
let combineReducers = (reducers)=>{
  // reducer需要返回一个默认的状态 （）
  return (state={},action)=>{
    let obj = {}
    for(let key in reducers){
      obj[key] = reducers[key](state[key],action)
    }
    return obj;
  }
}

export default combineReducers({list,counter})