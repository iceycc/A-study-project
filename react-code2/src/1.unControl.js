import React from 'react';
import ReactDom from 'react-dom'
// 受控组件 首状态控制 很快的进行校验 默认值操作
// 非受控组件：操作dom方便

// react 一般都是操作数据的

// 16.3的api React.creactRef()
// 1 方便  2 可以和第三方库结合使用


class UnControl extends React.Component{

    b = React.createRef()
    clickHandle = ()=>{
        console.log(this.a.value)
        console.log(this.b.current.value)
    }
    render(){
        return(
            <div>
                <input type="text" id="username" ref={dom=>{this.a=dom}}/>
                <input type="text" id="password" ref={this.b}/>
                <button onClick={this.clickHandle}>Click</button>
            </div>
        )
    }
}

ReactDom.render(<UnControl></UnControl>,window.root)