// 定义环境变量
let url;
if(DEV=='dev'){
    url = 'http://localhost:3000'
}else{
    url = 'http://production.com'
}
console.log(url)
console.log(expression)
console.log(result)
console.log(FLAG)




let xhr = new XMLHttpRequest();
import 'bootstrap'; // 之间这么引入 默认这样引入的是js 如想简洁点可以进行配置别名
import './style'
// import 'bootstrap/dist/css/bootstrap'; // 这样引入的是css 如想简洁点可以进行配置别名
// xhr.open('GET','/api/user',true);
xhr.open('GET','/user',true);
xhr.onload = function(){
    console.log(xhr.response)
}
xhr.send();
