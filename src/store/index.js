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

const store = new Vuex.Store({
  state: {},
  mutations: {
    setKeyValue(state, { module, key, value, merge = true }) {
      let _state = module ? state[module] : state;
      if (!_state) {
        console.error(`没有找到${module}模块`);
        return;
      }
      let flag =
        Object.prototype.toString.call(_state[key]) === "[object Object]";
      let flag2 = Object.prototype.toString.call(value) === "[object Object]";
      if (flag && flag2 && merge) {
        _state[key] = { ..._state[key], ...value };
      } else {
        _state[key] = value;
      }
    }
  },
  actions: {
    resetKeyValue({ commit }, { module, key }) {
      let value = JSON.parse(sessionStorage.getItem("initialize"))[module][key];
      console.log(value);
      commit("setKeyValue", {
        module,
        key,
        value,
        merge: false
      });
    }
  },
  plugins: [vuexLocal.plugin],
  modules
});

export const setStoreValue = (module, key, value, merge = true) => {
  store.commit("setKeyValue", {
    module,
    key,
    value,
    merge
  });
};

export const resetStoreValue = (module, key) => {
  if (!module && !key) {
    let defaultState = JSON.parse(sessionStorage.getItem("vuex"));
    Object.keys(store.state).forEach(m => {
      store.state[m] = defaultState[m];
    });
    return;
  }
  if (!!module && !key) {
    let defaultState = JSON.parse(sessionStorage.getItem("defaultState"));
    store.state[module] = defaultState[module];
    return;
  }
  store.dispatch("resetKeyValue", {
    module,
    key
  });
};

Vue.prototype.$setStoreValue = setStoreValue;
Vue.prototype.$resetStoreValue = resetStoreValue;
if (!sessionStorage.getItem("initialize")) {
  sessionStorage.setItem("initialize", JSON.stringify(store.state));
}
export default store;
