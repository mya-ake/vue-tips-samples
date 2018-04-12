import Vue from "vue";
import VueI18n from "vue-i18n";
import axios from "axios";

import messageJa from "@/../public/locales/common/ja";

Vue.use(VueI18n);

const allowLanguages = ["ja", "en"];
const categories = ["home", "about"];
const localesLoadStatus = categories.reduce((status, category) => {
  status[category] = allowLanguages.reduce((obj, language) => {
    obj[language] = false;
    return obj;
  }, {});
  return status;
}, {});

export const i18n = new VueI18n({
  locale: "ja",
  fallbackLocale: "ja",
  messages: {
    ja: messageJa
  }
});

export const setLang = lang => {
  if (allowLanguages.includes(lang) === false) {
    return;
  }
  i18n.locale = lang;
  axios.defaults.headers.common["Accept-Language"] = lang;
  document.querySelector("html").setAttribute("lang", lang);
};

export const loadLocaleMessage = async (lang, category) => {
  if (allowLanguages.includes(lang) === false) {
    return lang;
  }
  if (typeof category !== "string") {
    return lang;
  }
  if (category in localesLoadStatus === false) {
    return lang;
  }
  if (localesLoadStatus[category][lang] === true) {
    // 読み込み済み
    return lang;
  }

  const response = await axios
    .get(`/locales/${category}/${lang}.json`)
    .catch(error => error.response);
  if (response.status !== 200) {
    return lang;
  }
  i18n.setLocaleMessage(lang, response.data);
  return lang;
};
