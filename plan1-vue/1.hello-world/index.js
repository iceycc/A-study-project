var app1 = new Vue({
  el:'#app-1',
  data:{
    msg:'hello world'
  }
})

app1.msg = 'hi 你好'


var app2 = new Vue({
  el:'#app-2',
  data:{
    message:'页面加载于' + new Date().toLocaleString()
  }
})

var app3 =new Vue({
  el:'#app-3',
  data:{
    show:true,
    msg:5
  }
})

var timer =setInterval(()=>{
  if(--app3.msg <=0){
    app3.show = false
    clearInterval(timer)
  }
},1000)