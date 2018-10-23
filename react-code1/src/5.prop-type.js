import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
// React.Component会把当前传递的属性挂在在当前的实例上

class Person extends Component {
  static defaultProps = {
    name: "王冰洋"
  };
  static propTypes = { // 小写呢
    name: PropTypes.string.isRequired,
    gender: PropTypes.oneOf(["男", "女"]),
    hobby: PropTypes.arrayOf(PropTypes.string),
    pos:PropTypes.shape({
        x:PropTypes.number.isRequired,
        y:PropTypes.number.isRequired
    }),
    salary(props,propName,p){
        if(props[propName]<=3000){
            return new Error('工资太低了')
        }
    }
  }
  render() {
    let { name, gender, hobby, pos, salary } = this.props;
    return (
      <pre>
        姓名：
        {name}, <br />
        性别：
        {gender}, <br />
        兴趣：
        {hobby}, <br />
        坐标：x:
        {pos.x}
        ,y:
        {pos.y}, <br />
        工资：
        {salary}
      </pre>
    );
  }
}

let obj = {
  gender: "男",
  hobby: ["游戏", "唱歌"],
  pos: { x: 300, y: 400 },
  salary: 100
};

ReactDOM.render(<Person {...obj} />, window.root);
