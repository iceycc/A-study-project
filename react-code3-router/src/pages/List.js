import React from "react";
import {Link} from "react-router-dom"
export default class List extends React.Component {
  state = {
    users:[]
  }
  componentWillMount() {
    let users = JSON.parse(localStorage.getItem('lists')) || []
    this.setState({
      users
    })
  }
  render() {
    return (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>用户id</th>
              <th>用户名</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.users.map((item,index)=>{
                return(
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td><Link to={{pathname:"/user/detail/"+item.id,state:item}}>{item.username}</Link></td>
                    </tr>
                )
              })
            }
          </tbody>
        </table>
    )
  }
}