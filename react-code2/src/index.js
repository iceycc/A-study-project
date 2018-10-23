import React from 'react';
import ReactDom from 'react-dom'
// 受控组件 首状态控制 很快的进行校验 默认值操作

class Control extends React.Component {
    state = {
        a:'hellow',
        b:'world'
    }
    changeHandle=(e)=>{
        console.log(e.target.value)

        // 双向数据绑定 change时 讲界面数据 setState 跟新 从新渲染界面
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render(){
        return (
            <div>
                <input type="text" name="a" value={this.state.a} onChange={this.changeHandle}/>
                <input type="text" name="b" value={this.state.b} onChange={this.changeHandle}/>
                {this.state.a}
                {this.state.b}
            </div>
        )
    }
}

ReactDom.render(<Control></Control>,window.root)
