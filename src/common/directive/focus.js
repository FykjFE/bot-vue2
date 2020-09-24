export default {
  install(Vue) {
    Vue.directive("demo", {
      bind: function(el, binding, vnode) {
        console.log(binding, vnode);
        el.innerHTML = "<div style='color: #f00'>" + "<span>zzzz</span></div>";
      }
    });
  }
};
