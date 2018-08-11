import Vue from 'vue';
import Vuex from 'vuex';

import axios from './axios';

import * as sectionModule from '@/store/section';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    section: sectionModule,
  },
});

store.axios = axios;

export default store;
