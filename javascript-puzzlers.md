## parseInt && map
map的回调函数需要三个参数callback(currentValue, index, array)

MDN文档中指明parseInt第二个参数是一个2到36之间的整数值，用于指定转换中采用的基数。如果省略该参数或其值为0，则数字将以10为基础来解析。

如果该参数小于2或者大于36，则parseInt返回NaN。此外，转换失败也会返回NaN。

```
["1", "2", "3"].map(parseInt) // [1, NaN, NaN]
```
parseInt("3", 2)在二进制中，"3"是非法字符，转换失败，返回NaN

## null && instanceof
在MDN关于null的文档中也特别指出，typeof null的结果是"object"，它是ECMAScript的bug，其实应该是"null"，但这个bug由来已久，在javascript中已经存在了将近二十年，也许永远不会修复，因为这牵扯到太多的web系统，修复它会产生更多的bug，令许多系统无法正常工作。而instanceof运算符是用来测试一个对象在其原型链构造函数上是否具有prototype属性，null值并不是以Object原型创建出来的，所以`null instanceof Object`返回false

## reduce && reduceRight
MDN文档中关于Array.proptotype.reduce的描述如下所示
> 如果数组为空并且没有提供initialValue，会抛出TypeError。如果数组仅有一个元素（无论位置如何）并且没有提供initialValue，或者有提供initialValue但是数组为空，那么此唯一值将被返回并且callback不会被执行

```
[1].reduce(Math.pow) // 1
[10].reduce(Math.pow) // 10
[1,2,3].reduce(Math.pow) // 1，从左到右执行，分别是Math.pow(1,2)，得到的结果为1，再Math.pow(1,3)
[1,2,3].reduceRight(Math.pow) // 9，从右到左执行，分别是Math.pow(3,2)，得到的结果为9，再Math.pow(9,1)
```
用es5实现reduce方法
```
Array.prototype.reduceList = function(fn, sum) {
    if (typeof fn !== 'function') {
        throw new Error(`${fn} is not a function`)
    }
    if (typeof sum === 'undefined') sum = this[0]
    for (let i = 1, len = this.length; i < len; i++) {
        sum = fn(sum, this[i], i, this);
    }
    return sum;
}
```
用es5实现reduceRight方法
```
Array.prototype.reduceListRight = function(fn,sum){
    if(typeof fn !== 'function'){
        throw new Error(`${fn} is not a function`);
    }
    let index;
    if(typeof sum === 'undefined'){
        sum = this[this.length - 1];
        index = this.length - 2;
    }else{
        index = this.length - 1;
    }
    for(var i = index;i >= 0; i--){
        sum = fn(sum,this[i],i,this);
    }
    return sum;
}
```