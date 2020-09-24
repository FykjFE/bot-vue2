# bot-vue2
**vue2快速开发模版**
> 快速开始

1. yarn
2. yarn lint
3. yarn serve

> git提交

1. 使用`git cz`代替`git commit`
2. 每次提交只做一件事情

> 项目目录

```bash
├─public #webpack不会编译此目录
└─src
    ├─assets #静态资源
    │  └─scss #公共样式
    ├─components #全局注册组件
    │  └─directive #指令
    │  └─filter #过滤器
    │  └─prototype #属性
    ├─plugins #全局插件
    ├─router #路由
    ├─services #接口controller定义
    ├─store #store文件夹
    │  └─modules #各个模块
    ├─utils #工具类
    └─views #页面
```

> 相关文档
- [vue官网](https://cn.vuejs.org/v2/api/)
- [element](https://element.eleme.io/#/zh-CN)
