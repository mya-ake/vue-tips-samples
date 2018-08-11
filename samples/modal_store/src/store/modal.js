import { buildModuleTypes } from '@/helpers/store';

const moduleName = 'modal';

const MUTATION_TYPES = {
  SET_SHOW: 'SET_SHOW',
  SET_MODAL: 'SET_MODAL',
};

const ACTION_TYPES = {
  OPEN: 'OPEN',
  CLOSE: 'CLOSE',
};

const MODAL_STATE = {
  OPEN: true,
  CLOSE: false,
};

export const MODAL_ACTION_TYPES = buildModuleTypes({
  moduleName,
  types: ACTION_TYPES,
});

export const namespaced = true;

export const state = () => ({
  show: MODAL_STATE.CLOSE,
  title: '',
  message: '',
});

export const mutations = {
  [MUTATION_TYPES.SET_SHOW](state, show) {
    state.show = show;
  },

  [MUTATION_TYPES.SET_MODAL](state, { title, message }) {
    state.title = title;
    state.message = message;
  },
};

export const actions = {
  [ACTION_TYPES.OPEN]({ commit }, payload) {
    commit(MUTATION_TYPES.SET_MODAL, payload);
    commit(MUTATION_TYPES.SET_SHOW, MODAL_STATE.OPEN);
  },

  [ACTION_TYPES.CLOSE]({ commit }) {
    commit(MUTATION_TYPES.SET_SHOW, MODAL_STATE.CLOSE);
  },
};
