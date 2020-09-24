import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/scss/common.scss";
import "./plugins";
import "./components";
import "./common/directive";
import "./common/filter";
import "./common/prototype";
import "./services";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
