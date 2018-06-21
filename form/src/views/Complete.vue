<template>
  <div>
    <h1>Complete</h1>
    <router-link to="/form">フォームへ</router-link>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    if (from.path !== '/confirm') {
      next('/form');
    }
    next();
  },
};
</script>

<style lang="scss" scoped>
</style>
