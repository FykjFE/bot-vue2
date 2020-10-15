/**
 * 点击目标元素以外触发事件，比如点击模态框遮罩关闭模态框
 */
export default {
  install(Vue) {
    Vue.directive("click-outside", {
      bind(el, binding) {
        function clickHandler(e) {
          if (el.contains(e.target)) {
            return false;
          }
          if (binding.expression) {
            binding.value(e);
          }
        }
        el.__vueClickOutside__ = clickHandler;
        document.addEventListener("click", clickHandler);
      },
      unbind(el) {
        document.removeEventListener("click", el.__vueClickOutside__);
        delete el.__vueClickOutside__;
      }
    });
  }
};
