import React from 'react'
import {NavLink} from 'react-router-dom'
import MenuLink from './MenuLink'
export default class Index extends React.Component {
  render() {
    return (
        <div>
          <div className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="">用户管理系统</a>
              </div>
              <div className="nav navbar-nav">
                {/*<li><NavLink to="/Home">首页</NavLink></li>*/}
                {/*<li><NavLink to="/Profile">个人中心</NavLink></li>*/}
                {/*<li><NavLink to="/User">用户列表</NavLink></li>*/}
                {/*<li><NavLink to="/Login">登录</NavLink></li>*/}
                <MenuLink to="/Home">首页</MenuLink>
                <MenuLink to="/Profile">个人中心</MenuLink>
                <MenuLink to="/User">用户列表</MenuLink>
                <MenuLink to="/Login">登录</MenuLink>
              </div>
            </div>
          </div>
          <div className="container">
            {this.props.children}
          </div>
        </div>
    )
  }
}