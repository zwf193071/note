## ref/reactive
ref/reactive数据类型的特点：每次修改都会被追踪，都会更新UI界面，但这样是非常耗性能的。如果我们有一些操作不需要更新UI界面，这时候，可以通过toRaw方法拿到它的原始数据，对原始数据进行修改，这样就不会被追踪，也不会更新UI界面，性能也会相应地提高
triggerRef触发页面更新，没有对应的triggerReactive方法

## Vue3.0六大亮点
- Performance：性能比Vue 2.x快1.2~2倍
- Tree shaking support：按需编译，体积比Vue 2.x更小
- Composition API：组合API（类似React Hooks）
- Better Typescript support
- Custom Renderer API： 暴露了自定义渲染API
- Fragment，Teleport（Portal），Suspense：更先进的组件

## Vue3.0是如何变快的？
- diff算法优化
 1. Vue2中的虚拟dom是进行全量的对比
 2. Vue3新增了静态标记（PatchFlag）
- hoistStatic 静态提升
 1. Vue2中无论元素是否参与更新，每次都会重新创建
 2. Vue3中对于不参与更新的元素，只会被创建一次
- cacheHandlers事件侦听器缓存
1. Vue2默认情况下onClick会被视为动态绑定，所以每次都会去追踪它的变化
2. Vue3同一个函数，没有追踪变化，直接缓存复用即可
- ssr渲染
 1. 当有大量静态内容时，这些内容会被当做纯字符串推进一个buffer内
 2. 当静态内容大到一定量级时，会用_createStaticVNode方法在客户端生成一个static node，这些静态node，会被直接innerHtml，不需要创建对象再根据对象渲染