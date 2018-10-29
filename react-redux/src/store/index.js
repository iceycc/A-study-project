import {createStore} from 'redux';
import * as types from '../store/action-type'

let initState = {
  number:0
};

function reducer(state=initState,action){
  switch(action.type){
    case types.ADD:
      return {number:state.number+action.count};
      break;
    case types.MINUS:
      return {number:state.number-action.count};
  }
  return state
}

let store = createStore(reducer);
window.store = store
export default store;
