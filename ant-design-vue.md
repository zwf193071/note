1. ProxyComponent（类似React的componentWillReceiveProps）
watch a和b两个变量，当a和b同时变化时（比如按钮点击，同时改变这两个变量），希望只执行一次函数

2. CloneVnode（类似React的shouldComponentUpdate）
当组件A隐藏时，此时改变组件A内的变量值，页面的更新是无意义的，只有当组件A显示时，才进行页面的更新

3. Ref引用
vue不知为何回滚了Ref的callback形式，之前已合并到主分支，目前Vue2.*中的Ref仍然采用字符串形式

用vue-ref替代




## 其他知识点
1. 改变元素left，用style.transform = `translateX(${i}px)`

循环时间 setInterval 第二个参数为16ms，其原理为1000/60，因每秒60帧会让人觉得比较流畅，那么16ms应显示一帧

最佳办法：改用requestAnimationFrame
window.requestAnimationFrame()
说明：该方法会告诉浏览器在重绘之前调用你所指定的函数
1. 参数：该方法使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用
回调函数会被自动传入一个参数（浏览器做的），DOMHighResTimeStamp，标识requestAnimationFrame()开始触发回调函数的当前时间

2. 返回值：一个long整数，也成为请求ID，是个非零值，是回调列表中唯一的标识，没别的意义

`window.cancelAnimationFrame(requestID)`
取消一个先前通过调用`window.requestAnimationFrame()`方法添加到计划中的动画帧请求
`requestID`是先前调用`window.requestAnimationFrame()`方法时返回的ID

### requestAnimationFrame 
`requestAnimationFrame`比起 `setTimeout、setInterval`的优势主要有两点：
1. `requestAnimationFrame` 会把每一帧中的所有DOM操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率，一般来说，这个频率为每秒60帧。
2. 在隐藏或不可见的元素中，`requestAnimationFrame`将不会进行重绘或回流，这当然就意味着更少的的`cpu`，`gpu`和内存使用量。

默认情况下，`requestAnimationFrame`执行频率是`1000/60`,大概是`16ms多`执一次