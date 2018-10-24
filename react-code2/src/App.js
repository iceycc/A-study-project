import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "./context";

import List from "./components/List";
import Comment from "./components/Comment";

axios.interceptors.response.use(function(result) {
  if (result.data.code === 0) {
    return result.data.users;
  } else {
    return Promise.reject("请求错误");
  }
});

// PureComponent
export default class App extends React.Component {
  state = {
    users: [],
    count: 0
  };
  increment = ()=>{
      this.setState({
          count:this.state.count + 1
      })
  }
  //
  async componentDidMount() {
    let users = await axios.get("/user.json");
    this.setState({
      users
    });
  }
  addUser = val => {
    let users = [...this.state.users, { username: "游客", content: val }];
    this.setState({
      users
    });
  };
  delUser = val => {
    let users = this.state.users.filter((item, index) => index !== val);
    this.setState({
      users
    });
  };

  delCommont = val => {
    this.delUser(val);
  };
  render() {
    return (
      <Provider value={{increment:this.increment,color:'red'}}>
        <div className="container">
          <div className="panel panel-danger">
            <div className="panel-heading">评论</div>
            <div className="panel-body">
              <List users={this.state.users} delCommont={this.delCommont} />
            </div>
            <div className="panel-footer">
              <Comment addUser={this.addUser} />
            </div>
            <div>
                点赞数：{this.state.count}
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}
