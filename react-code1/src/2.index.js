import React from 'react';
import {render} from 'react-dom';

// jsx 语法 javascript + xml
// jsx特点 class和for都为js关键字
// class =》 className
// for =》htmlFor
// style  
// dangerousInnderHTML （xss攻击）

// jsx元素/react元素  <
// 看到 {}  会认为里面装的是js代码

let str = '<h1>world</h1>';

let el = (
    <div>
        <h1 className="a">hellow</h1>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username"/>
        <div style={{color:'red'}}>hellow</div>
        {/* 注释 */}
       <div dangerouslySetInnerHTML={{__html:str}}></div> 

    </div>
)

let str1 = 'hellow';
// 取值表达式  可以把返回值显示到页面中
let a = function(){
    return (
        <div>hellow</div>
    )
}
let show = true
let obj = {a:1} // 渲染成字符串才能展示
let el1 = (
   <React.Fragment>
        <div>{str1}</div>
        <div>{a()}</div>
        <div>{JSON.stringify(obj)}</div>
        <div>{show?<span>你好</span>:void 0}</div>
   </React.Fragment>
)

// 渲染数组
let arr =[1,2,3,45]
let el2 = (
    arr.map((item,key)=>{
     return <li key={key}>{item}</li>  
    })
)

render(el2,window.root)