import Vue from 'vue';
import Vuex from 'vuex';

import * as formModule from './store/form';
import * as modalModule from './store/modal';
import * as sectionModule from './store/section';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    form: formModule,
    modal: modalModule,
    section: sectionModule,
  },
});
