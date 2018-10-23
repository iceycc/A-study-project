// react api少，  vue大量api
// redux
// import React from 'react';
// import {render} from 'react-dom'


let React = {
    createElement(type,props,...children){
        return {type,props,children}
    }
}
function render(vnode,container){
    // 校验vnode
    if(typeof vnode === 'string') return container.appendChild(document.createTextNode(vnode));
    // 
    let {type,props,children} = vnode;
    let tag = document.createElement(type);
    for(let key in props){
        tag.setAttribute(key,props[key])
    }
    children.forEach(child=>{
        render(child,tag);
    });
    container.appendChild(tag)
}

let el = (
    <h1>hellow
         <span id='cc'>world</span>
    </h1>
)

render(el,window.root)