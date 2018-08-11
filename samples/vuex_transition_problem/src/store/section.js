import { buildModuleTypes } from '@/helpers/store';

import { SORT_ORDERS } from '@/constants/api';

const moduleName = 'section';

const MUTATION_TYPES = {
  SET_SECTIONS: 'SET_SECTIONS',
};

const ACTION_TYPES = {
  REQUEST_SECTIONS: 'REQUEST_SECTIONS',
  REQUEST_SECTIONS_EXPECT: 'REQUEST_SECTIONS_EXPECT',
};

export const SECTION_ACTION_TYPES = buildModuleTypes({
  moduleName,
  types: ACTION_TYPES,
});

export const namespaced = true;

export const state = {
  sections: [],
};

export const mutations = {
  [MUTATION_TYPES.SET_SECTIONS](state, sections) {
    state.sections = sections;
  },
};

export const actions = {
  // APIのレスポンスをcommitする方
  async [ACTION_TYPES.REQUEST_SECTIONS](
    { commit },
    { order = SORT_ORDERS.ASC },
  ) {
    const response = await this.axios
      .get(`/sections/${order}.json`)
      .catch(err => {
        return err.response;
      });

    // 期待する方の場合はcommitする必要がなくなる
    if (response.status !== 200) {
      commit(MUTATION_TYPES.SET_SECTIONS, []);
    } else {
      const { sections } = response.data;
      commit(MUTATION_TYPES.SET_SECTIONS, sections);
    }
    return response;
  },

  // APIのレスポンスをそのまま返す（エラーハンドリングだけする）
  // 書籍内のサービス的な使い方
  [ACTION_TYPES.REQUEST_SECTIONS_EXPECT](_, { order = SORT_ORDERS.ASC }) {
    return this.axios.get(`/sections/${order}.json`).catch(err => {
      return err.response;
    });
  },
};
