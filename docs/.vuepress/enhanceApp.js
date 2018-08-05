import VueAxios from "vue-axios";

import store from './store';
import routes from './routes'
import axios from './axios';
import { DemoModal } from './views';

export default ({
  Vue,
  router,
  options,
}) => {
  // components
  Vue.component('demo-modal', DemoModal);

  // add store
  store.axios = axios;
  options.store = store;

  // demo router
  router.addRoutes(routes);

  // axios
  Vue.use(VueAxios, axios);
};
