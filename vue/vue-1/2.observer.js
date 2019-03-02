let obj = {
  name: "wby",
  age: 19,
  habby: {
    a: "football",
    b: {
      c: "d"
    }
  }
};

function Observer(obj) {
  if (typeof obj == "object") {
    for (key in obj) {
      defineReactive(obj, key, obj[key]);
    }
  }
}
function defineReactive(obj, key, value) {
  Observer(value) // 判断value是对象的话进行监控
  Object.defineProperty(obj, key, {
    set(val) {
      Observer(val) // 传人的值也是对象的话
      console.log("set");
      value = val;
    },
    get() {
      // console.log("get");
      return value;
    }
  });
}
Observer(obj);
// console.log(obj.name)
// obj.name = 1
// console.log(obj.name)

// console.log(obj.habby.a)
// console.log(obj.habby.b.c)

obj.habby.a='1232131'

// console.log(obj.habby.b.c);
// obj.habby.b.c = "cccc";
// console.log(obj.habby.b.c);
