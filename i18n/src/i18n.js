import Vue from "vue";
import VueI18n from "vue-i18n";
import axios from "axios";

Vue.use(VueI18n);

/** 定数とか */
const fallbackLocale = "ja";
const allowedLanguages = ["ja", "en"];
const categories = ["common", "home", "about"];
const localesLoadStatus = categories.reduce((status, category) => {
  status[category] = allowedLanguages.reduce((obj, language) => {
    obj[language] = false;
    return obj;
  }, {});
  return status;
}, {});

/** functions */
export const allowLanguage = lang => {
  return allowedLanguages.includes(lang);
};

export const extractLanguage = () => {
  if (typeof window === "undefined") {
    return fallbackLocale;
  }
  const lang = window.location.pathname
    .replace(/^\/|\/$/g, "")
    .split("/")
    .shift();
  if (allowLanguage(lang) === false) {
    return fallbackLocale;
  }
  return lang;
};

const requestLocaleMessage = async (lang, category) => {
  if (allowLanguage(lang) === false) {
    return null;
  }
  if (typeof category !== "string") {
    return null;
  }
  if (category in localesLoadStatus === false) {
    return null;
  }
  if (localesLoadStatus[category][lang] === true) {
    // 読み込み済み
    return null;
  }

  const response = await axios
    .get(`/locales/${category}/${lang}.json`)
    .catch(error => error.response);

  if (response.status !== 200) {
    return null;
  }
  return response.data;
};

export const i18n = new VueI18n({
  fallbackLocale,
  messages: {}
});

export const setLang = async lang => {
  if (allowLanguage(lang) === false) {
    return;
  }
  if (lang === i18n.locale) {
    return;
  }
  await loadLocaleMessage(lang, "common");
  i18n.locale = lang;
  axios.defaults.headers.common["Accept-Language"] = lang;
  document.querySelector("html").setAttribute("lang", lang);
};

export const loadLocaleMessage = async (lang, category) => {
  const message = await requestLocaleMessage(lang, category);
  if (message === null) {
    return lang;
  }
  localesLoadStatus[category][lang] = true;

  // すでにあるものとマージさせる
  const messages = {
    ...i18n.messages[lang],
    ...message
  };
  i18n.setLocaleMessage(lang, messages);
  return lang;
};
