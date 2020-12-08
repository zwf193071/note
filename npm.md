## 本地编写npm包
编写顺丰公司下的内部npm包，整个框架初步结构如下图所示：
![架构](./2020/12/img/npm_0.png)

图片右侧红框内的代码之所以注释，原因如下图所示：
![原因](./2020/12/img/npm_1.png)

在webpack打包的时候，可以在js文件中混用require和export。但是不能混用import 以及module.exports。

因为webpack 2中不允许混用import和module.exports

故本地编写npm包，推荐使用export default，等到发布包的时候再将其改用成上面的代码。

### 项目内如何引用该npm包
在main.js中，加入以下代码即可：
```
import SFView from '@/sf-view-vue/src';

Vue.use(SFView);
```
在其他页面组件内，即可引用该包下面的`search-input`组件，如下图所示：

![alt](./2020/12/img/npm_2.png)