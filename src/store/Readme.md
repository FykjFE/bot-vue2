# Vuex 状态管理
- 以业务页面或独立的过程作为模块分隔方式，模块名称与页面名称、过程名称相对应。 
  * 不要将具体业务接口的调用封装在store里。对于业务store里只存对象即可。
  * state里尽量用对象的形式进行存储。当业务中需要修改保存操作时，
  * 当属性涉及业务保存时不要用computed，而用watch接收store里的值，且进行深度复制，不要直接在state对象上修改。以免中途不保存或保存失败造成数据污染。
  * 非涉及具体业务且数据需要放在store的，则可以直接在store中的ation中调用接口。如token
  * 修改state ，统一通过公共的state赋值方法setStoreValue, 模块中引入import { setStoreValue } from '@/store' 即可使用
  * 集成了持久化工具，页面刷新后，store里的数据不会丢失。
  * 当需要还原某个state属性值时，统一调用公共的方法resetStoreValue

# 公共的state赋值方法
- setStoreValue(modules,key,value) 

参数| 类型| 说明 <div style="min-width:4rem"></div>|默认值
---|---|---|---|
moudles|String|指定具体模块名，为falsely时，视为根模块|--
key|String|指定模块中state中的属性名|--
value|any| 具体的所赋的值| -
merge| Boolean|赋值方式，当merge为true，且赋值对象和所赋都为Object为合并赋值， 否则都为替换赋值|true

``` javascript
this.$setStoreValue('token','tokenObj',{ token: res.token, expireDate: parseInt(res.expireDate) })
token -->store modules
tokenObj -->modules->token->state
value -->{ token: res.token, expireDate: parseInt(res.expireDate) }
```
#公共的state重置方法
- resetStoreValue(modules,key) 

参数| 类型| 说明 <div style="min-width:4rem"></div>|默认值
---|---|---|---|
——|——|modules,key都为falsely时，还原所有模块|——
moudles|String|指定具体模块名，<font color="red">为falsely时，视为根模块 </font>|--
key|String|指定模块中state中的属性名 <font color="red">为falsely时，视为还原当前根模块所有属性</font>|--

``` javascript
//还原user模块中userInfo属性
this.$resetStoreValue('user','userInfo')
//还原user模块中所有属性
this.$resetStoreValue('user') 
//还原所有模块中所有属性
this.$resetStoreValue() 
```
