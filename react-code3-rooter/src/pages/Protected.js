import React from 'react';
import {Route, Redirect} from 'react-router-dom';

export default class Protected extends React.Component {

  render() {
    let login = localStorage.getItem('login')
    return login  ? <Route {...this.props}/> : <Redirect to={{pathname: "/Login", state: {"from": this.props.path}}}/>
  }
}