import VuexTransitionLayoutExpect from './components/VuexTransitionLayoutExpect';
import VuexTransitionLayoutProblem from './components/VuexTransitionLayoutProblem';
import VuexTransitionHome from './components/VuexTransitionHome'; 
import VuexTransitionExpectAsc from './components/VuexTransitionExpectAsc';
import VuexTransitionExpectDesc from './components/VuexTransitionExpectDesc';
import VuexTransitionProblemAsc from './components/VuexTransitionProblemAsc';
import VuexTransitionProblemDesc from './components/VuexTransitionProblemDesc';

export default [
  {
    path: '/demo/vuex_transition_problem',
    component: VuexTransitionHome,
  },
  {
    path: '/demo/vuex_transition_problem/problem',
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
    path: '/demo/vuex-vuex_transition_problem/expect',
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
];
