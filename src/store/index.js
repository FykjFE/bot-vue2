import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
});
Vue.use(Vuex);
const files = require.context("./modules", true, /\.js$/);
const modules = files.keys().reduce((prev, curr) => {
  return { ...prev, [/[^./].+(?=\.js$)/.exec(curr)[0]]: files(curr).default };
}, {});
export default new Vuex.Store({
  // todo根目录设置store
  state: {},
  mutations: {},
  actions: {},
  plugins: [vuexLocal.plugin],
  modules: modules
});
