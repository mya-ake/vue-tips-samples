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
    values: createInitailFormState() // フォーム全体を１つのobjectで持つ
  },
  getters: {
    values(state) {
      return state.values;
    }
  },
  mutations: {
    setValues(state, values) {
      state.values = values;
    },
    clearValues(state) {
      state.values = createInitailFormState();
    }
  }
});
