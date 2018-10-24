import React from "react";

export default class Comment extends React.Component {
    content = React.createRef();
    submitHandle=(e)=>{
        e.preventDefault();
        this.props.addUser(this.content.current.value)
    }
  render() {
    return (
      <div>
        <form onSubmit={this.submitHandle}>
          <textarea className="form-control" required ref={this.content} />
          <button className="btn btn-primary" type="submit">
            发送
          </button>
        </form>
      </div>
    );
  }
}
