<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" v-t="'nav.home'"></router-link> |
      <router-link to="/about" v-t="'nav.about'"></router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
</style>
