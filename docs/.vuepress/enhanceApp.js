import Vuex from 'vuex';

import { DemoModal } from './views'
import * as modalModule from './store/modal';

export default ({
  Vue,
  options,
}) => {
  Vue.use(Vuex);

  Vue.component('demo-modal', DemoModal)

  options.store = new Vuex.Store({
    modules: {
      modal: modalModule,
    },
  });
};
