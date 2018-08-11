import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Problem from './layouts/Problem';
import ProblemAsc from './views/ProblemAsc';
import ProblemDesc from './views/ProblemDesc';
import Expect from './layouts/Expect';
import ExpectAsc from './views/ExpectAsc';
import ExpectDesc from './views/ExpectDesc';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/problem',
      component: Problem,
      children: [
        {
          path: 'asc',
          component: ProblemAsc,
        },
        {
          path: 'desc',
          component: ProblemDesc,
        },
      ],
    },
    {
      path: '/expect',
      component: Expect,
      children: [
        {
          path: 'asc',
          component: ExpectAsc,
        },
        {
          path: 'desc',
          component: ExpectDesc,
        },
      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
