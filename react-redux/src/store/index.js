import {createStore} from 'redux';
import reducer from './reducers/Counter'
let store = createStore(reducer);
window.store = store
export default store;