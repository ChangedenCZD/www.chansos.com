# optimat-vuejs

> 一个基于Vuejs+Webpack定义了开发规范的网页开发框架。

[更新日志](/CHANGE_LOGS.md)
## Build Setup

``` bash
# 安装
npm install

# 在开发环境运行，url = localhost:8080
npm run dev

# 编译项目
npm run build
```
# 快速创建Module和Component
修改 /easyGen/config.json 文件。
config.json文件内容为Json字符串。
"modules": [{"page-title": "页面标题","url-path": "页面访问时的相对路径"}]
"components": [{"import-path": "引用组件的相对位置"}]
编辑完并保存config.json文件后，运行easyGen.bat即可。

# Api组件封装规范
```js
|--- api
  |--- config.js
    |--- module.exports = { // 添加接口Url
           DEMO: 'https://api.github.com/repos/axios/axios/issues'
         }
  |--- index.js
    |--- const config = require('./config') // 导入接口配置
    |--- module.exports = { // 公开的可调用接口
           getDemo: (page) => { // 接口样例
             return new ApiOptions(config.DEMO, {}, GET).setParams({per_page: page}).request();
           },
           postDemo: (page) => {
             return new ApiOptions(config.DEMO, {per_page: page}, POST).request();
           }
         }
```
# 接口使用方法
### 直接导入Api
```js
import api from './api'; // 导入接口
api.demo(1).then(data => {
  // 调用成功
}).catch(err => {
  // 调用失败
});
```
### Context的子类
```js
import Context from './lib/Context';
class Module extends Context {
  constructor() {
    super();
    this.Api.demo(1).then(data => {
      // 调用成功
    }).catch(err => {
      // 调用失败
    })
  }
}
```

# 目录结构

```js
|--- build  // 参考vue-cli生成的脚手架
|--- config // 参考vue-cli生成的脚手架
|--- easyGen // 快速创建Module和Component的工具
|--- dist // 编译后的文件
|--- src
  |--- api // Api组件
  |--- assets // 网页中的静态资源
  |--- components // 组件
    |--- component.js // 组件中vue单文件的js引用
    |--- component.scss // 组件中vue单文件的样式引用
    |--- component.vue // 组件中vue单文件
    |--- index.js // 组建入口
  |--- entry // 入口文件夹（自动化生成）
  |--- lib // 有关class封装
    |--- ApiOptions.js // Api参数封装类，内部包含request方法
    |--- Context.js // 基类，内部引入了Api组件
    |--- BaseModule.js // Module的基类，继承于BaseClass，实现了Vue的部分生命周期
  |--- module // 页面
    |--- config.json // 页面的配置文件（包含页面标题字段page-title，相对网页访问路径字段redirect-url）
    |--- module.js // 页面中默认vue单文件的js引用
    |--- module.scss // 页面中默认vue单文件的样式引用
    |--- module.vue // 页面中默认vue单文件
  |--- store // vuex 的实现
  |--- template // 快速生成工具的模板
  |--- utils // 工具类
  |--- main.js // 页面公用统一入口（用于统一处理共同的业务）
|--- static // 静态资源
|--- test // 测试文件目录
```
