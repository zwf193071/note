## 类型为unknown的不能直接赋值给类型为string的变量
```
let e:unknown;
let a:string

// 若直接赋值，会有错误提示
a = e

// 若unknown想赋值给字符串变量a，可以先typeof判断，或者类型断言，语法：
// 1. 变量 as 类型; 2. <类型>变量
if(typeof e === 'string') a = e
// 类型断言
a = e as string;
a = <string> e
```