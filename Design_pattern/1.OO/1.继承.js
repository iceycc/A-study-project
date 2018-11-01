// 定义一个动物类

function Animal(name){
  console.log(arguments);
  this.name = name || 'Animal';
  this.sleep = function(){
    console.log(this.name + '正在睡觉！');
  }
}
Animal.prototype.eat = function(food){
  console.log(`${this.name}吃${food}`)
}

// 方法一 原型链继承
console.log('----------------方法一 原型链继承-------------------------')
function Cat(){

}
Cat.prototype = new Animal()
Cat.prototype.name = 'cat'
// Cat.name = 'cat' //xx
let cat = new Cat()
console.log(cat.name);
cat.sleep()
cat.eat('鱼')
console.log(cat instanceof Animal);
console.log(cat instanceof Cat);
console.log('----------------方法一 end-------------------------')

console.log('----------------方法二 构造继承-------------------------')
// 方法二 构造继承
function Dog(name,...argv){
  Animal.call(this,name,...argv)
  this.name = name
}
Dog.prototype.eat = function (food) {
  console.log(`${this.name}吃${food}`);
}
let dog = new Dog('dog','c',1,3)
console.log(dog.name);
dog.sleep()
dog.eat('骨头')  //
console.log(dog instanceof Animal);
console.log(dog instanceof Dog);

console.log('----------------方法二 end-------------------------')

console.log('----------------方法三 组合继承-------------------------')
// 方法二 构造继承
function Dark(name,...argv){
  Animal.call(this,name,...argv)
  this.name = name
}
Dark.prototype = new Animal()
let dark = new Dark('Dark','c',1,3)
console.log(dark.name);
dark.sleep()
dark.eat('虾')
console.log(dark instanceof Animal);
console.log(dark instanceof Dark);

console.log('----------------方法三 end-------------------------')

console.log('----------------方法四 寄生组合继承-------------------------')
// 方法二 构造继承
function Bird(name,...argv){
  Animal.call(this,name,...argv)
  this.name = name
}
(function () {
  let Super = function () {}
  Super.prototype = Animal.prototype
  Bird.prototype = new Super()
})()
let bird = new Bird('Bird','c',1,3)
console.log(bird.name);
bird.sleep()
bird.eat('虫子')
console.log(bird instanceof Animal);
console.log(bird instanceof Bird);

console.log('----------------方法四 end-------------------------')
