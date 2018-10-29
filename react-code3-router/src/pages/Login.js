import React from 'react';

export default class Login extends React.Component {
  loginHandle=()=>{
    localStorage.setItem('login','OK')
    if(this.props.location.state){
      this.props.history.push(this.props.location.state.from)
    }else{
      this.props.history.push('/')
    }
  }
  logoutHandle=()=>{
    localStorage.removeItem('login')
  }

  render(){
    return(
        <div>
          <button onClick={this.loginHandle} className="btn btn-primary">登录</button>
          <button onClick={this.logoutHandle} className="btn btn-danger">退出</button>
        </div>
    )
  }
}