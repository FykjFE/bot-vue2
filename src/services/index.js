import Vue from "vue";
Vue.prototype.$service = {};
const services = require.context("", true, /^((?!index).)+\.js$/);
services.keys().forEach(service => {
  Vue.prototype.$service[
    /[^./].+(?=\.service\.js$)/.exec(service)[0]
  ] = services(service).default;
});
