import Vue from "vue";
const files = require.context("./", true, /\.vue/);
files.keys().forEach(item => {
  let name = item.match(/[^\./]+(?=[\.|/])/g)[0];
  let component = files(item).default;
  Vue.component(name, component);
});
