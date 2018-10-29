// 我们的数据对象，
var data = {
  a: 1,
  foo:'bar'
}
// Object.freeze() 方法可以冻结一个对象，冻结指的是不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。该方法返回被冻结的对象。
// Object.freeze(data) // 会组织后面改变
var vm = new Vue({
  // options
  el:'#app',
  data: data,
  beforeCreated(){

  },
  created(){ // 不要在选项属性或回调上使用箭头函数
    // this指向vm实例
    console.log('create');
    console.log(this.a)
    // console.log(vm.data.a) //错误
  },
  beforeMounted(){
    console.log('beforeMounted');
  },
  mounted(){
    console.log('mounted');
  },
  beforeUpdated(){
    console.log('beforeUpdated');
  },
  updated(){
    console.log('update');
  },
  actived(){
    console.log('actived');
  },
  deactived(){
    // keep-alive 组件停用时调用。
    console.log('deactived');
  },
  beforeDestroy(){
    console.log('beforeDestroy');
  },
  destroyed(){
    console.log('destroyed');
  },

  errorCaptured(){
    // 当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播。
  }
})

// 获得这个实例上的属性
// 返回源数据中对应的字段
console.log(vm.a == data.a);// true
// 设置属性也会影响到原始数据
vm.a = 2;
console.log(data.a); // 2

// 反之亦然
data.a = 3;
console.log(vm.a); // 3

// data中为定义的属性 不会响应式

vm.b = 'hi'; //注意在data里设置初始值

data.a = 4
console.log(data.a);

// Vue实例还会暴露一些有用的方法和属性。$开头，用于区分用户自定义属性
console.log(vm.$data === data); // true
console.log(vm.$el = document.getElementById('#app'));// true

// 不要用箭头函数
vm.$watch('a',function(n,o){
  console.log('a update',n);
})

//
Vue.filter('aFilter',function(val){
  return val + '元'
})


// 生命周期 lifecycle
