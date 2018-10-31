import * as types from '../action-type';
let actions = {
  remove(id){
    return{type:types.REMOVE_LIST_BY_ID,id}
  }
}

export default actions