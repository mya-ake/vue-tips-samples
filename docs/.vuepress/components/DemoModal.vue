<template>
  <base-button
    v-on:click="handleClick"
    kind="primary"
  >モーダルを開く</base-button>
</template>

<script>
import BaseButton from "./BaseButton";
import { MODAL_ACTION_TYPES } from "./../store/modal";

export default {
  components: {
    BaseButton,
  },

  methods: {
    handleClick() {
      this.$store.dispatch(MODAL_ACTION_TYPES.OPEN, {
        title: "モーダルのサンプル",
        message: "Home画面から開かれました。"
      });
    },
  },
};
</script>
