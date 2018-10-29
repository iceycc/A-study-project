import React from "react";
import {Redirect} from "react-router-dom"
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import User from "./pages/User";
import Login from "./pages/Login";
import Index from "./pages/index";
import Protected from "./pages/Protected"
// BrowserRouter
import {
  Switch,
  Route,
  HashRouter as Router
} from "react-router-dom";

export default class App extends React.Component {
  render() {
    return (
        <Router>
          <Index>
            <Switch>
              {/*  exact={true} 代表的是严格匹配 */}
              <Route path="/Home" exact={true} component={Home}/>
              <Route path="/User" component={User}/>
              <Route path="/Login" component={Login}/>
              {/*登录拦截*/}
              <Protected path="/Profile" component={Profile}/>
              {/* 重定向跳转页面 */}
              <Redirect to="/Home"/>
            </Switch>
          </Index>
        </Router>
    );
  }
}
