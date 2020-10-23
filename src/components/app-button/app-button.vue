<template>
  <button :style="styles" @click="handleClick">
    <!-- @slot 默认插槽 -->
    <slot></slot>
    <!-- @slot 前缀插槽 -->
    <slot name="prefix"></slot>
  </button>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    /**
     * 字体颜色
     */
    color: {
      type: String,
      default: "black"
    },
    /**
     * 按钮背景色
     */
    background: {
      type: String,
      default: "white"
    },
    /** @deprecated 废弃属性，使用color */
    oldColor: String
  },
  computed: {
    styles() {
      return {
        "font-size": this.size,
        color: this.color,
        background: this.background
      };
    }
  },
  methods: {
    /**
     * 单击事件
     * @param {Event} e
     * @public
     */
    init(e) {
      console.log(JSON.stringify(e));
    },
    handleClick(e) {
      /** 点击事件
       * @event click
       * @type {Event}
       */
      this.$emit("click", e);

      /** Event for Alligator's example
       * @event gator
       * @type {Event}
       */
      this.$emit("gator", e);
    }
  }
};
</script>

<docs>

## 例子

Orange button:

```jsx
<app-button color="orange">点击</app-button>
```

其他列子

```jsx 
<app-button color="pink" background="blue">
  Ugly button
</app-button>
```

Button containing custom tags:

```jsx
<app-button>
  Text with <b>bold</b>
</app-button>
```
</docs>
