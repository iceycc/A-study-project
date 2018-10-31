import * as types from '../action-type';

let initState = [{content:'吃饭',id:1},{content:'睡觉',id:2},{content:'写代码',id:3}]

function list(state=initState,action){
  console.log('action',action);
  switch (action.type){
    case types.REMOVE_LIST_BY_ID:
      return state.filter((i)=>i.id!=action.id)
  }

  return state;
}

export default list;