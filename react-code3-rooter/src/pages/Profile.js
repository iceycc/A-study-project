import React from 'react';

export default class Profile extends React.Component {
  render() {
    let login = localStorage.getItem('login')
    console.log(login);
    return (
        <div>
          Profile 啊啊啊啊
        </div>
    )
  }
}