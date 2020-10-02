# bot-vue2
**vue2快速开发模版**
> 快速开始

1. yarn
2. yarn lint
3. yarn serve

> 代码提交规范

|     关键字     |   注释          |
|----------|-------------|
| feat     | 新特性/功能      |
| fix      | bug修复       |
| docs     | 仅修改文档        |
| style    | 代码格式的美化      |
| refactor | 代码重构(没有fix和feat) |
| perf     | 提升性能        |
| test     | 代码测试        |
| chore     | src目录以外的修改|
| ci     | CI/CD改动|
| build     | 修改构建配置|
| revert     | 版本回滚|

> 例子
```shell
git commit -m "feat: 添加登录功能"
```

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

> todo

- [ ] 分页助手
- [ ] form封装
- [ ] table封装
