var app1 = new Vue({
  el: '#app-1',
  data: {
    msg: 'hello world'
  }
})

app1.msg = 'hi 你好'


var app2 = new Vue({
  el: '#app-2',
  data: {
    message: '页面加载于' + new Date().toLocaleString()
  }
})

var app3 = new Vue({
  el: '#app-3',
  data: {
    show: true,
    msg: 5
  }
})

var timer = setInterval(() => {
  if (--app3.msg <= 0) {
    app3.show = false
    clearInterval(timer)
  }
}, 1000)


var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      {text:'学习js'},
      {text:'学习 Vue'},
      {text:'整个牛项目'}
    ]
  }
})


var  app5 = new Vue({
  el:'#app-5',
  data:{
    message:'hello Vue.js'
  },
  methods:{
    reverseMessage(){
      this.message = this.message.split('').reverse().join('')
    }
  }
})

var app6 = new Vue({
  el:'#app-6',
  data:{
    message:'hello world'
  }
})



Vue.component('todo-item',{
  props:['todo'],
  template:`<li>{{todo.text}}</li>`
})

var app7 = new Vue({
  el:'#app-7',
  data:{
    groceryList:[
      {id:0,text:'西瓜'},
      {id:1,text:'白菜'},
      {id:2,text:'牛奶'}
    ]
  }
})