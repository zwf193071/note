## 包的总名
公司下面的npm包，我建议统一放在`@SF`下面，再按照功能模块进行划分，如
### 核心包
- @SF/core

### 功能包
- @SF/ar-wh-platform

`ar`: Applied Research 应用研发部

`wh`: 武汉

`platform`: 通用平台组件，即目前大搜等组件应存放的位置

### 工具包
- @SF/util

存放公司通用的工具，如统一的编译工具等等

类似于以`@babel`开头的各种包，如`@babel/traverse`、`@babel/parser`等

但是像这种`@`开头命名的包，会被npm默认为私有包，发布的时候，需要执行`npm publish --access=public`来发布

### 包管理工具lerna
当不止一个包时，需要采用lerna进行统一的管理

lerna解决的问题：

1. 依赖处理繁琐

2. 依赖的模块，尚处在开发之中，通行的npm install、yarn等无法从安装源中获得

3. 被依赖的模块版本升级，模块其他版本需要手动管理相关的版本

4. 有循环依赖的风险

## vue组件命名空间
组件命名空间，vue官方暂无规划，只能在注册组件时带前缀，通用平台组件，我建议统一携带前缀`ar-wh-platform-`，后面跟具体的组件名
