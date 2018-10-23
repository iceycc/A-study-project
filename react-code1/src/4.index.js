import React,{Component} from 'react';
import ReactDOM,{render} from 'react-dom';

class Clock extends Component{
    constructor(props){
        super(props)
        this.state = {
            time:new Date().toLocaleString(),
            a:'Time',
        }
    }
    // 生命周期  mounted
    componentDidMount(){
        this.timer = setInterval(()=>{
            this.setState({
                time:new Date().toLocaleString()
            })
        })
    }
    // 生命周期
    componentWillUnmount(){
        clearInterval(this.timer)
    }
   handleClick(){
       ReactDOM.unmountComponentAtNode(window.root)
   }
    render(){
        return (
            <div>
                {this.state.a}
                <span>{this.state.time}</span>
                <button onClick={this.handleClick}>删除</button>
            </div>
        )
    }

}
let el = (
    <div>
        <Clock></Clock>
    </div>
)

render(el,window.root)