import React from 'react';
import {NavLink, Switch, Route} from 'react-router-dom'
import Add from "./Add"
import List from "./List"
import Detail from "./Detail"

export default class User extends React.Component {
  render() {
    return (
        <div className="row">
          <div className="col-md-3">
            <div className="nav nav-stacked">
              <li><NavLink to="/user/add">添加用户</NavLink></li>
              <li><NavLink to="/user/list">用户列表</NavLink></li>
            </div>
          </div>
          <div className="col-md-9">
            <Switch>
              <Route path="/user" exact={true}/>
              <Route path="/user/add" component={Add}/>
              <Route path="/user/list" component={List}/>
              <Route path="/user/detail/:id" component={Detail}/>
            </Switch>
          </div>
        </div>
    )
  }
}