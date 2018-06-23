import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import Confirm from '@/views/Confirm';
import * as formModule from '@/store/form';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);

const router = new VueRouter();

describe('Confirm view', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        form: formModule,
      },
    });
  });

  it('mount', () => {
    const wrapper = shallowMount(Confirm, { store, router, localVue });
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
