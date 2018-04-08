<template>
  <div>
    <h1>Confirm</h1>
    <div>
      <p>メールアドレス</p>
      <p>{{ values.email }}</p>
    </div>
    <div>
      <button
        v-on:click="handleClickSubmit"
      >送信する</button>
      <router-link to="/form">戻る</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      values: this.$store.getters.values
    };
  },
  methods: {
    handleClickSubmit() {}
  }
};
</script>

<style lang="scss" scoped>
</style>
