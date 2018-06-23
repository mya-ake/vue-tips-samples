import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import Form from '@/views/Form';
import * as formModule from '@/store/form';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Form view', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        form: formModule,
      },
    });
  });

  it('mount', () => {
    const wrapper = shallowMount(Form, { store, localVue });
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
