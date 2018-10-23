import React from 'react';
import {render} from 'react-dom';

// 组件
// 1 复用 
// 2 方便维护
// 3 提高工作效率

//react 组件 函数声明，类声明
// 组件的特点 首字母大些

// 函数声明组件的缺点
function Build(props){
    let {title,content} = props
    return (
        <div>
            <div>{title}</div>
            <div>{content}</div>
        </div>
    )
}

let el = (
    <div>
        <Build title='白菜' content='2'></Build>
        <Build title='火腿' content='3'></Build>
    </div>
)

function Clock(props) {
   return  <div>time:<span>{props.time}</span></div>
}    

setInterval(()=>{
    let timer = new Date().toLocaleString()
    render(<Clock time={timer}></Clock>,window.root)
},1000)

