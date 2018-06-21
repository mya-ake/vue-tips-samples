import Vue from 'vue';
import Vuex from 'vuex';

import * as formModule from '@/store/form';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    form: formModule,
  },
});
