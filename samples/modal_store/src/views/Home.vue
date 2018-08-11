<template>
  <div>
    <h1>Home</h1>
    <base-button
      kind="primary"
      v-on:click="handleClick"
    >モーダルを開く</base-button>
  </div>
</template>

<script>
import { BaseButton } from '@/components';
import { MODAL_ACTION_TYPES } from '@/store/modal';

export default {
  components: {
    BaseButton,
  },
  methods: {
    handleClick() {
      this.$store.dispatch(MODAL_ACTION_TYPES.OPEN, {
        title: 'モーダルのサンプル',
        message: 'Home画面から開かれました。',
      });
    },
  },
};
</script>
