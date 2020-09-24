import Vue from "vue";
const componentsContext = require.context("", true, /\.vue$/);
componentsContext.keys().forEach(component => {
  const componentConfig = componentsContext(component).default;
  Vue.component(componentConfig.name, componentConfig);
});
