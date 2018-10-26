import React from "react";

export default class Add extends React.Component {
  input = React.createRef();
  handleSubmit =(e)=>{
    e.preventDefault()
    console.log(this.input.current.value);
    let lists = localStorage.getItem('lists');
    lists = JSON.parse(lists) || [];
    lists.push({
      id:lists.length+1,username:this.input.current.value
    })
    localStorage.setItem('lists',JSON.stringify(lists))
    this.props.history.push('/user/list')
  }
  render(){
    return (
      <div className="">
        <form action="" className="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">用户名</label>
            <input type="text" id="username" className="form-control" ref={this.input}/>
          </div>
          <div className="form-group">
            <input type="submit" className="btn btn-success"/>
          </div>
        </form>
      </div>
    )
  }
}
