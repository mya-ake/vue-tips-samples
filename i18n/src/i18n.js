import Vue from 'vue';
import VueI18n from 'vue-i18n';
import axios from 'axios';

Vue.use(VueI18n);

/** 定数とか */
const fallbackLocale = 'ja';
const allowedLanguages = ['ja', 'en'];
const categories = ['common', 'home', 'about'];
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
  if (typeof window === 'undefined') {
    return fallbackLocale;
  }
  const lang = window.location.pathname
    .replace(/^\/|\/$/g, '')
    .split('/')
    .shift();
  if (allowLanguage(lang) === false) {
    return fallbackLocale;
  }
  return lang;
};

export const i18n = new VueI18n({
  locale: fallbackLocale,
  fallbackLocale,
  messages: {},
});

export const setLang = async lang => {
  if (allowLanguage(lang) === false) {
    return;
  }
  if (lang === i18n.locale) {
    return;
  }
  await loadLocaleMessage(lang, 'common');
  i18n.locale = lang;
  axios.defaults.headers.common['Accept-Language'] = lang;
  document.querySelector('html').setAttribute('lang', lang);
};

const requestableLocaleMessage = (lang, category) => {
  if (allowLanguage(lang) === false) {
    return false;
  }
  if (typeof category !== 'string') {
    return false;
  }
  if (category in localesLoadStatus === false) {
    return false;
  }
  if (localesLoadStatus[category][lang] === true) {
    // 読み込み済み
    return false;
  }

  return true;
};

export const loadLocaleMessage = async (lang, category) => {
  const requestable = requestableLocaleMessage(lang, category);
  if (requestable === false) {
    return;
  }

  const response = await axios
    .get(`/locales/${category}/${lang}.json`)
    .catch(error => error.response);

  if (response.status !== 200) {
    // 細かくエラーハンドリングした方がいい
    return;
  }

  const message = response.data;
  // すでにあるものとマージさせる
  const messages = {
    ...i18n.messages[lang],
    ...message,
  };
  i18n.setLocaleMessage(lang, messages);

  localesLoadStatus[category][lang] = true;
};
