import React from 'react';
import store from '../store'
import action from '../store/action/List'
export default class List extends React.Component {
  state = {
    lists:store.getState().list
  }

  componentWillMount(){
    store.subscribe(()=>{
      this.setState({
        lists:store.getState().list
      })
    })
  }
  render(){
    console.log(this.state.lists);
    return(
        <div>
          {this.state.lists.map((item,index)=>{
            return(
               <div key={item.id}>
                 <li>{item.content}</li>
                 <button onClick={()=>{
                   console.log(item.id);
                   store.dispatch(action.remove(item.id))
                 }}>-</button>
               </div>
            )
          })}
        </div>
    )
  }
}
