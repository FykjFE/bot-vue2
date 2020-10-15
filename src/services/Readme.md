# 服务端接口
- 所有接口按模块名写在modules内，在index.js中 将所有模块都注入到vue实例$service上，
-  利用require.context自动化导入。优点：代码简洁
-  利用gulp自动导入。优点： 在项目中使用时可以自动补全提示所有属性和方法