import { setStoreValue } from "@/store";
const demo = {
  namespaced: true,
  state: () => ({
    count: 0,
    obj: {
      a: ""
    }
  }),
  actions: {
    increment({ state }) {
      setStoreValue("demo", "count", state.count + 1);
    }
  },
  getters: {}
};
export default demo;
