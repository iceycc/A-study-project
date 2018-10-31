import * as types from '../action-type'

let initState = {
  number:0
};

function Counter(state=initState,action){
  switch(action.type){
    case types.ADD:
      return {number:state.number+action.count};
      break;
    case types.MINUS:
      return {number:state.number-action.count};
  }
  return state
}

export default Counter
