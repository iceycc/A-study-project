import React from "react";
import { Consumer } from "../context";
export default class ListItem extends React.Component {
  delCommont = val => {
    this.props.delUser(val);
  };
  render() {
    let { avatar, username, content, index } = this.props;
    return (
      <Consumer>
        {value => {
          return (
            <div className="media">
              <div className="media-left">
                <img src={avatar} alt="" width="50px" />
              </div>
              <div className="media-body">
                <h3>
                  昵称:
                  {username}
                </h3>
                <p>
                  回复:
                  {content}
                </p>
                <button
                  className="btn btn-danger"
                  onClick={this.delCommont.bind(null, index)}
                >
                  删除
                </button>
                <button style={{color:value.color}} className="btn" onClick={()=>{value.increment()}}>点赞</button>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
