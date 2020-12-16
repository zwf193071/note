## 题目测试
1. 下面代码的输出结果是什么？
```
function sayHi() {
    console.log(name);
    console.log(age);
    var name = "lydia";
    let age = 21;
}
```
输出
```
undefined 和 ReferenceError
```

2. 下面关于类class的描述，错误的是：
- Javascript类class的本质上是基于原型prototy的实现方式做了进一步的封装
- constructor构造方法是必须的
- 如果类的constructor构造方法有多个，后者会覆盖前者
- 类的静态方法可以通过类名调用，不需要实例化

最后一点是错误的

3. 请问以下代码fn.name的结果是什么？
```
function Fn() {
    this.name='zzz';
    return {}
}
var fn = new Fn();
```
输出`undefined`

5. 下面运行结果正确的是
```
var a = {}, b = Object.prototype;
[a.prototype === b, Object.getPrototypeOf(a) === b]
```
输出`[false, true]`
**解析：**a只有属性__proto__，并没有prototype