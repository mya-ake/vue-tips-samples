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
import BaseButton from "./BaseButton";
import TheModal from "./TheModal";
import { MODAL_ACTION_TYPES } from "./../store/modal";

export default {
  components: {
    BaseButton,
    TheModal,
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
