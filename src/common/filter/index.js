import Vue from "vue";
const filters = require.context("", true, /^((?!index).)+\.js$/);
filters.keys().forEach(filter => {
  Vue.use(filters(filter).default);
});
