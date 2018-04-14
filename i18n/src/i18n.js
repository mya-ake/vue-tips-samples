import Vue from "vue";
import VueI18n from "vue-i18n";
import axios from "axios";

import messageJa from "@/../public/locales/common/ja";
import messageEn from "@/../public/locales/common/en";

Vue.use(VueI18n);

/** 定数とか */
const fallbackLocale = "ja";
const allowedLanguages = ["ja", "en"];
const categories = ["home", "about"];
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

const extractLanguage = () => {
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

export const requestLocaleMessage = async (lang, category) => {
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
  locale: extractLanguage(),
  fallbackLocale,
  messages: {
    ja: messageJa,
    en: messageEn
  }
});

export const setLang = lang => {
  if (allowLanguage(lang) === false) {
    return;
  }
  i18n.locale = lang;
  axios.defaults.headers.common["Accept-Language"] = lang;
  document.querySelector("html").setAttribute("lang", lang);
};

export const loadLocaleMessage = async (lang, category) => {
  const message = await requestLocaleMessage(lang, category);
  if (message === null) {
    return;
  }
  localesLoadStatus[category][lang] = true;

  // すでにあるものとマージさせる
  const messages = {
    ...i18n.messages[lang],
    ...message
  };
  i18n.setLocaleMessage(lang, messages);
};
