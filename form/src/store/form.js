export const namespaced = true;

export const state = {
  formValues: null
};

export const mutations = {
  setFormValues(state, formValues) {
    state.formValues = formValues;
  }
};
