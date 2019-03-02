// let button = document.createElement('button');
// button.innerHTML = '按钮';

// button.addEventListener('click',function(){
//   import('./source.js').then((data)=>{
//     console.log('source',data.default)
//   })
// })

// document.body.appendChild(button)

import str from './source'
// console.log(str)
if(module.hot){
  module.hot.accept('./source',()=>{
    console.log('文件更新')
    let str = require('./source')
    console.log(str)

  })
}

