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
  computed: {
    values() {
      return this.$store.getters.values;
    }
  },
  methods: {
    handleClickSubmit() {
      // eslint-disable-next-line
      console.log(this.values);
      this.$store.commit("clearValues");
      this.$router.push("/form");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
