<template>
  <div class="home">
    <h1 v-t="'home.title'"></h1>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$i18n);
  }
};
</script>
