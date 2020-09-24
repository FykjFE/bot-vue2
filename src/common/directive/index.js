import Vue from "vue";
const directives = require.context("", true, /^((?!index).)+\.js$/);
directives.keys().forEach(directive => {
  Vue.use(directives(directive).default);
});
