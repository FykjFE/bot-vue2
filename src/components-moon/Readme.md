# 逻辑组件

 - **描述：** 对基础组件库的封装，如DCloud官方的组件uni-ui,和uviewUI的二次封装。不涉及具体业务 ，

 - **使用方式：** 在页面中直接使用，不需要import和component注册, 

- **命名规则：** 必须以“moon-具体组件名”的方式命名，文件夹名与vue文件名必须相同 , 最外层view的class以当前组件名字命名
 ``` javascirpt
 <moon-input></moon-input>
 ```