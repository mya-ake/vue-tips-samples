import { DemoVuexTransition, DemoI18n } from './views'
import I18nHome from './components/I18nHome';
import I18nAbout from './components/I18nAbout';
import VuexTransitionLayoutExpect from './components/VuexTransitionLayoutExpect';
import VuexTransitionLayoutProblem from './components/VuexTransitionLayoutProblem';
import VuexTransitionHome from './components/VuexTransitionHome'; 
import VuexTransitionExpectAsc from './components/VuexTransitionExpectAsc';
import VuexTransitionExpectDesc from './components/VuexTransitionExpectDesc';
import VuexTransitionProblemAsc from './components/VuexTransitionProblemAsc';
import VuexTransitionProblemDesc from './components/VuexTransitionProblemDesc';

export default [
  {
    path: '/demo/i18n',
    component: DemoI18n,
    children: [
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
    ],
  },
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
        path: "*",
        redirect: "/demo/vuex_transition_problem/"
      }
      ]
  }
];
