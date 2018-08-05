import Vue from 'vue';
import Vuex from 'vuex';

import * as modalModule from './store/modal';
import * as sectionModule from './store/section';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    modal: modalModule,
    section: sectionModule,
  },
});
