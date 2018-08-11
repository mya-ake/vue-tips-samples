import { i18n } from './i18n';

import { DemoVuexTransition, DemoForm, DemoI18n } from './views';
import I18nHome from './components/I18nHome';
import I18nAbout from './components/I18nAbout';
import VuexTransitionLayoutExpect from './components/VuexTransitionLayoutExpect';
import VuexTransitionLayoutProblem from './components/VuexTransitionLayoutProblem';
import VuexTransitionHome from './components/VuexTransitionHome';
import VuexTransitionExpectAsc from './components/VuexTransitionExpectAsc';
import VuexTransitionExpectDesc from './components/VuexTransitionExpectDesc';
import VuexTransitionProblemAsc from './components/VuexTransitionProblemAsc';
import VuexTransitionProblemDesc from './components/VuexTransitionProblemDesc';
import ContactForm from './components/ContactForm'
import ContactConfirm from './components/ContactConfirm'
import ContactComplete from './components/ContactComplete'

const i18nBasePath = '/demo/i18n';
const i18nOriginRoutes = [
  {
    path: '',
    name: 'i18n-home',
    component: I18nHome,
    meta: {
      locale: {
        category: 'home',
      },
    },
  },
  {
    path: 'about',
    name: 'i18n-about',
    component: I18nAbout,
    meta: {
      locale: {
        category: 'about',
      },
    },
  },
];

const i18nLocalesRoutes = i18nOriginRoutes.map(route => {
  return {
    ...route,
    name: undefined,
  };
});

i18nOriginRoutes.forEach(route => {
  delete route.component;
  route.redirect = to => {
    const fullPath = to.fullPath.replace(new RegExp(`^${i18nBasePath}`), '');
    const path = `${i18nBasePath}/${i18n.locale}${fullPath}/`.replace(
      /\/\/$/,
      '/',
    );
    return {
      path,
      params: {
        lang: i18n.locale,
      },
    };
  };
});

const i18nRoutes = [
  {
    path: i18nBasePath,
    component: DemoI18n,
    children: i18nOriginRoutes,
  },
  {
    path: `${i18nBasePath}/:lang`,
    component: DemoI18n,
    children: i18nLocalesRoutes,
  },
  {
    path: `${i18nBasePath}/*`,
    redirect() {
      return `${i18nBasePath}/${i18n.locale}`;
    },
  },
];

const vuexTransitionRoutes = [
  {
    path: '/demo/vuex_transition_problem',
    component: DemoVuexTransition,
    children: [
      {
        path: '',
        component: VuexTransitionHome,
      },
      {
        path: 'problem',
        component: VuexTransitionLayoutProblem,
        children: [
          {
            path: 'asc',
            component: VuexTransitionProblemAsc,
          },
          {
            path: 'desc',
            component: VuexTransitionProblemDesc,
          },
        ],
      },
      {
        path: 'expect',
        component: VuexTransitionLayoutExpect,
        children: [
          {
            path: 'asc',
            component: VuexTransitionExpectAsc,
          },
          {
            path: 'desc',
            component: VuexTransitionExpectDesc,
          },
        ],
      },
      {
        path: '*',
        redirect: '/demo/vuex_transition_problem/',
      },
    ],
  },
];

const formRoutes = [
  {
    path: '/demo/form',
    component: DemoForm,
    children: [
      {
        path: '',
        component: ContactForm,
      },
      {
        path: 'confirm',
        component: ContactConfirm,
      },
      {
        path: 'complete',
        component: ContactComplete,
      },
      {
        path: '*',
        redirect: '/demo/form/',
      },
    ],
  },
];

export default [...formRoutes, ...i18nRoutes, ...vuexTransitionRoutes];
