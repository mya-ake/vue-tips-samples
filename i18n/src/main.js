import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { i18n, setLang, loadLocaleMessage } from "./i18n";

Vue.config.productionTip = false;

// 遷移時に必要な言語ファイルを取りにいく
router.beforeEach(async (to, from, next) => {
  const lang = to.params.lang;
  const { locale } = to.meta;
  setLang(lang);
  await loadLocaleMessage(lang, locale.category);
  next();
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
