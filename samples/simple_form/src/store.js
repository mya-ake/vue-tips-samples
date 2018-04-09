import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const createInitailFormState = () => {
  return {
    email: ""
  };
};

export default new Vuex.Store({
  state: {
    values: null // フォーム全体を１つのプロパティで持つ
  },
  getters: {
    values(state) {
      if (state.values === null) {
        return createInitailFormState();
      }
      return state.values;
    }
  },
  mutations: {
    setValues(state, values) {
      state.values = values;
    },
    clearValues(state) {
      state.values = null;
    }
  }
});
