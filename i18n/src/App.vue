<template>
  <div id="app">
    <div id="nav">
      <router-link v-t="'nav.home'" to="/"/> |
      <router-link v-t="'nav.about'" to="/about"/> | 
      <router-link v-t="'nav.change-language'" v-bind:to="changeLanguageTo"/>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    changeLanguageTo() {
      switch (this.$i18n.locale) {
        case 'en':
          return '/ja';
        default:
          return '/en';
      }
    },
  },
};
</script>
