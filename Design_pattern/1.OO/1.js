class Animal {
  constructor(name) {
    this.name = name;
  }

  eat(food) {
    console.log('food', food, this)
  }
  speak(){
    console.log('Animal speak');
  }
  static sleep() {
    console.log('sleep', this)
  }
}

let dog = new Animal('dog')
// 1。原型方法只能实例调用
// Animal.eat('XX')
dog.eat('肉')

let s = dog.eat
s('骨头')
// 2。 // 不需要实例调用静态方法
Animal.sleep()
// a.sleep() // 实例不能调用静态方法


class Cat extends Animal{
  speak(){
    this.eat('鱼')
    super.speak()
    console.log(this.name);
  }
}
let cat = new Cat('cat')
cat.speak()
