import React from 'react'
import {Link} from 'react-router-dom'
export default class Index extends React.Component{
    render(){
        return(
            <div>
                <Link to="/home">home</Link> 
                <Link to="/Profile">Profile</Link>
                <Link to="/User">User</Link>
                {this.props.children}
            </div>
        )
    }
}