import Vuex from 'vuex';

import * as modalModule from './store/modal';

export default ({
  Vue,
  options,
}) => {
  Vue.use(Vuex);

  options.store = new Vuex.Store({
    modules: {
      modal: modalModule,
    },
  });
};
