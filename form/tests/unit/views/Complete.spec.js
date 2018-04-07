import { shallow, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

import Complete from "@/views/Complete";
import * as formModule from "@/store/form";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Complete view", () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        form: formModule
      }
    });
  });

  it("mount", () => {
    const wrapper = shallow(Complete, { store, localVue });
    expect(wrapper.isVueInstance).toBeTruthy();
  });
});
