import Vue from 'vue';
import App from './App.vue';
import router from './router';
import {
  i18n,
  allowLanguage,
  extractLanguage,
  setLang,
  loadLocaleMessage,
} from './i18n';

Vue.config.productionTip = false;

// 遷移時に必要な言語ファイルを取りにいく
router.beforeEach(async (to, from, next) => {
  const lang = to.params.lang;

  if (allowLanguage(lang) === false) {
    next(`/${i18n.locale}`);
    return;
  }

  const { locale } = to.meta;
  await setLang(lang);
  await loadLocaleMessage(lang, locale.category);
  next();
});

// 最初の言語を決めるためにマウント前に言語ファイルを取りにいく
(async () => {
  const lang = extractLanguage();
  await setLang(lang);
  await loadLocaleMessage(lang, 'common');
  new Vue({
    router,
    i18n,
    render: h => h(App),
  }).$mount('#app');
})();
