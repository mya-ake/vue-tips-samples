<template>
  <layout-demo>
    <div class="nav">
      <router-link to="/">Home</router-link> | 
      <router-link to="/demo/">Demo</router-link> | 
    </div>
    <router-view/>
  </layout-demo>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.nav {
  padding: 8px 0;
}
</style>
