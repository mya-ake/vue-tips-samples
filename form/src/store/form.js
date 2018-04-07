import { buildModuleTypes } from "@/helpers/store";
import { ContactForm } from "@/models";

const moduleName = "form";
const GETTER_TYPES = {
  VALUES: "VALUES"
};
const MUTATION_TYPES = {
  SET_VALUES: "SET_VALUES"
};

export const FORM_GETTER_TYPES = buildModuleTypes({
  moduleName,
  types: GETTER_TYPES
});

export const FORM_MUTATION_TYPES = buildModuleTypes({
  moduleName,
  types: MUTATION_TYPES
});

export const namespaced = true;

export const state = {
  values: null
};

export const getters = {
  [GETTER_TYPES.VALUES](state) {
    if (state.values === null) {
      return new ContactForm().properties();
    }
    return state.values;
  }
};

export const mutations = {
  [MUTATION_TYPES.SET_VALUES](state, values) {
    state.values = values;
  }
};
