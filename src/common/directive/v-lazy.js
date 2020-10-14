/**
 * 图片懒加载指令
 * example
 * <img v-lazy="'https://demo.jpg'"/>
 */
export default {
  install(Vue) {
    Vue.directive("lazy", {
      bind: function(el, binding) {
        let lazyImageObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            let lazyImage = entry.target;
            if (entry.intersectionRatio > 0) {
              lazyImage.src = binding.value;
              lazyImageObserver.unobserve(lazyImage);
            }
          });
        });
        lazyImageObserver.observe(el);
      }
    });
  }
};
