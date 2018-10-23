import React, { Component } from "react";
import ReactDOM from "react-dom";
//更新组件有两种方式 
// 1. 给组件传递新的属性
// 2. 让组件调用setState

class Counter extends Component{
    constructor(props){
        super(props);
        this.state = {
            num:0,
            count:0
        }
    }
    clickHandle=()=>{
        // setState批量更新  setState是同步还是异步  有时候是同步有时候是异步
        this.setState({
            num:this.state.num + 2
        },function(){
            this.setState({
                num:this.state.num + 1
            })
        })
        //
        this.setState((pre)=>({count:pre.count+1}))
        this.setState((pre)=>({count:pre.count+1}))
        
    }
    render(){
        return (
            <div>
                num:{this.state.num} <br/>
                count:{this.state.count}
                <button onClick={this.clickHandle}>+</button>
            </div>
        )
    }
  
}

ReactDOM.render(<Counter></Counter>,window.root)