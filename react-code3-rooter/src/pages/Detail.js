import React from 'react';

export default class Detail extends React.Component{
  state = {
    user:{}
  }
  componentWillMount(){
    let s = this.props.location.state
    if(s){
      // 用户通过Link点过来的
      this.setState({user:s})
    }else {
      // 其他情况过来 比如原页刷新
      let users = JSON.parse(localStorage.getItem('lists'))
      let user = users.find(user=>user.id==this.props.match.params.id) || {}
      this.setState({
        user
      })
    }
  }
  render(){
    return(
        <div>
          {this.state.user.id?<div>{this.state.user.username}</div>:null}
        </div>
    )
  }
}