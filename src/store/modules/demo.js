const demo = {
  namespaced: true,
  state: () => ({
    count: 0
  }),
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  actions: {
    increment({ commit }) {
      commit("increment");
    }
  },
  getters: {}
};
export default demo;
