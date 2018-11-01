class Person {
  public name:string; //共有属性，自己，自己的子类可以访问
  protected age:number; // 受保护的属性 自己 字段子类能访问 其他类不能访问
  private money:number; // 私有的 自己能访问， 自己的子类和其他类都不能访问
  constructor(name,age,money){
    this.name = name;
    this.age = age;
    this.money = money;
  }
}

class Student extends Person {
  public num:number;
  constructor(name,age,money,num){
    super(name,age,money);
    this.num = num
  }
  getName(){
    console.log(`我叫${this.name}`);
  }
  getAge(){
    console.log(`我今年${this.age}了`);
  }
  getMoney() {
    //money属性是私有的，只能在Person类中被访问
    // console.log(`我的私房钱是 ${this.money}`);
  }
}

let s1 = new Student('王冰洋',12,10000,300)
console.log(s1);