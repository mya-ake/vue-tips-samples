<template>
  <layout-demo>
    <div>
      <router-link to="/">Home</router-link> | 
      <router-link to="/demo/">Demo</router-link> | 
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
