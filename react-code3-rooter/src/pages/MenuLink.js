import React from 'react'
import {Route,Link} from 'react-router-dom'

export default class MenuLink extends React.Component {
  render() {

    return (
        <Route path={this.props.to} children={({match}) => {
          return <li className={match?"active":""}>
            <Link to={this.props.to}>{this.props.children}</Link>
          </li>
        }}/>
    )
  }
}