import React from "react";
import ListItem from './ListItem'
export default class List extends React.Component {
  render() {
    return (
      <div>
        {this.props.users.map((item, index) => {
          return (
            <ListItem index={index} {...item} key={index} delUser={this.props.delCommont}></ListItem>
          );
        })}
      </div>
    );
  }
}
