<template>
  <layout-demo>
    <div class="nav">
      <router-link to="/">Home</router-link> | 
      <router-link to="/demo/">Demo</router-link>
    </div>
    <div class="nav">
      <router-link to="/demo/vuex_transition_problem/">サンプルのHome</router-link> | 
      <router-link to="/demo/vuex_transition_problem/problem/asc">問題になる方</router-link> | 
      <router-link to="/demo/vuex_transition_problem/expect/asc">期待する方</router-link>
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

