import Vue from 'vue';
import Router from 'vue-router';
import Form from './views/Form.vue';
import Confirm from './views/Confirm.vue';
import Complete from './views/Complete';
import SampleValidationAttribute from './views/SampleValidationAttribute';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/form',
      name: 'form',
      component: Form,
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: Confirm,
    },
    {
      path: '/complete',
      name: 'complete',
      component: Complete,
    },
    {
      path: '/samples/validation-attr',
      name: 'samaples-validation-attr',
      component: SampleValidationAttribute,
    },
    {
      path: '*',
      redirect: '/form',
    },
  ],
});
