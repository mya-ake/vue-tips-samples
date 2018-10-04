import VueAxios from 'vue-axios';

import axios from './axios';
import {
  i18n,
  allowLanguage,
  extractLanguage,
  setLang,
  loadLocaleMessage,
} from './i18n';
import store from './store';
import routes from './routes';
import { LayoutDemo, DemoModal, DemoVuexTransition } from './views';

const setI18nRouterHook = router => {
  // 遷移時に必要な言語ファイルを取りにいく
  router.beforeEach(async (to, from, next) => {
    if ('params' in to === false || 'lang' in to.params === false) {
      // lang パラメータがなければスキップ
      next();
      return;
    }

    const { lang } = to.params;

    if (allowLanguage(lang) === false) {
      next(`/demo/i18n/${i18n.locale}`);
      return;
    }

    const { locale } = to.meta;
    await setLang(lang);
    await loadLocaleMessage(lang, locale.category);
    next();
  });
};

export default ({ Vue, router, options }) => {
  // components
  Vue.component('layout-demo', LayoutDemo);
  Vue.component('demo-modal', DemoModal);
  Vue.component('demo-vuex-transition', DemoVuexTransition);

  // add store
  store.axios = axios;
  options.store = store;

  // demo router
  router.addRoutes(routes);
  router.afterEach((to, from) => {
    if ('r' in to.query) {
      const redirect = to.query.r;
      const nextPath = `/${redirect.split('-').join('/')}/`;
      Vue.nextTick().then(() => {
        router.push(nextPath);
      })
    }
  })

  // axios
  Vue.use(VueAxios, axios);

  // i18n
  options.i18n = i18n;
  setI18nRouterHook(router);
  // 最初の言語を決めるためにマウント前に言語ファイルを取りにいく
  (async () => {
    const lang = extractLanguage();
    await setLang(lang);
    await loadLocaleMessage(lang, 'common');
  })();
};
