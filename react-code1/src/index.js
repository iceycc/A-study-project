import React, { Component } from "react";
import ReactDOM from "react-dom";

// React16.3 退出了新的生命周期

// Parent-constructor
// Parent-componentWillMount
// Parent-render
// Child-constructor
// Child-componentWillMount
// Child-render
// Child-componentDidMount
// Parent-componentDidMount


class Parent extends Component{
    // 1 . 最早
    static defaultProps = {
        a:1
    }
    // 
    state={
        num:0
    }
    constructor(props){
        console.log('Parent-constructor')
        super()
    }

    // 组件将要装载 react16.3中这个方法将要呗弃用
    componentWillMount(){
        console.log('Parent-componentWillMount')
        // 后期有需要的话可以放在 constructor中代替
    }
    componentDidMount(){
        console.log('Parent-componentDidMount')
    }

    // react的性能优化 immutablejs
    shouldComponentUpdate(){
        console.log('Parent-shouldComponentUpdate')
        // immutable.js  https://www.cnblogs.com/penghuwan/p/6707254.html
        // 
        return true
    }
    componentWillUpdate(){
        console.log('Parent-componentWillUpdate')
    }
    componentDidUpdate(newProps,oldProps,z){
        console.log('Parent-componentDidUpdate')
        console.log(newProps,oldProps,z)
    }
    clickHandle=()=>{
        this.setState({
            num:this.state.num+1
        })
    }
    componentWillUnmount(){
        console.log('Parent-componentWillUnmount')
    }
    componentDidCatch(){
        console.log('Parent-componentDidCatch')
    }
    render(){
        console.log('Parent-render')
        return (
            <div>
                <button onClick={this.clickHandle}>+</button> <br/>
                parent：{this.state.num} <br/>
                <Child num={this.state.num}></Child>
            </div>
        )
    }

}

class Child extends Component {
    render(){
        console.log('Child-render')
        return (
            <div>
                child counter {this.props.num}
            </div>
        )
    }
    constructor(props){
        console.log('Child-constructor')
        super()
    }
    componentWillMount(){
        console.log('Child-componentWillMount')

    }
    componentDidMount(){
        console.log('Child-componentDidMount')

    }
    componentWillUpdate(){
        console.log('Child-componentWillUpdate')

    }
    componentDidUpdate(){
        console.log('Child-componentDidUpdate')

    }
    // 第一次不执行  16.3中这个方法废弃了
    componentWillReceiveProps(){
        // 接收到某个属性后 把这个属性变成了当前组件的状态
        console.log('Child-componentWillReceiveProps')
    }

  // 可以直接调用 并且不需要再写setState  新状态
  static getDerivedStateFromProps(newProps){ 
    console.log(newProps)
    return {m:2}
  }
}
// 
// componentWillMount 对
// render 对
// componentDidMount 对
// shouldComponentUpdate 优化
// componentWillUpdate 用不到
// componentDidUpdate 用不到
// componentWillReceiveProps 偶尔用到
// componentWillUnmount 解绑事件 可能会用到

ReactDOM.render(<Parent></Parent>,window.root)