import Vue from 'vue';
import Vuex from 'vuex';
import * as modalModule from '@/store/modal';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    modal: modalModule,
  },
});
