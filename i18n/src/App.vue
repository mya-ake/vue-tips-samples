<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" v-t="'nav.home'"></router-link> |
      <router-link to="/about" v-t="'nav.about'"></router-link> | 
      <router-link v-bind:to="changeLanguageTo" v-t="'nav.change-language'"></router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    changeLanguageTo() {
      switch (this.$i18n.locale) {
        case "en":
          return "/ja";
        default:
          return "/en";
      }
    }
  }
};
</script>
