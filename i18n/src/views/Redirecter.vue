<template>
  <div></div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    next(`/ja${to.fullPath}`);
  }
};
</script>
