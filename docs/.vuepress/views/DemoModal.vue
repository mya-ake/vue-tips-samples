<template>
  <div>
    <base-button
      v-on:click="handleClick"
      kind="primary"
    >モーダルを開く</base-button>
    <the-modal/>
  </div>
</template>

<script>
import { MODAL_ACTION_TYPES } from "./../store/modal";

export default {
  methods: {
    handleClick() {
      this.$store.dispatch(MODAL_ACTION_TYPES.OPEN, {
        title: "モーダルのサンプル",
        message: "Vuexのアクションを呼んで開かれました"
      });
    },
  },
};
</script>
