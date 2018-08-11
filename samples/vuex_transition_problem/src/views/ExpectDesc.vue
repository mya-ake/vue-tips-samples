<template>
  <div>
    <em>降順</em>
    <ul>
      <li
        v-for="(section, index) in sections"
        v-bind:key="`section-${index}`"
      >{{section.number}}章 {{section.title}}</li>
    </ul>
  </div>
</template>

<script>
import { SECTION_ACTION_TYPES } from '@/store/section';
import { SORT_ORDERS } from '@/constants/api';
import store from '@/store';

export default {
  async beforeRouteEnter(to, from, next) {
    const response = await store.dispatch(
      SECTION_ACTION_TYPES.REQUEST_SECTIONS_EXPECT,
      {
        order: SORT_ORDERS.DESC,
      },
    );

    next(vm => {
      // Nuxt.js の asyncData と同様の動きとなる
      if (response.status !== 200) {
        // なにかエラー処理すべき
        vm.sections = [];
      } else {
        const { sections } = response.data;
        vm.sections = sections;
      }
    });
  },

  data() {
    return {
      sections: [],
    };
  },
};
</script>
