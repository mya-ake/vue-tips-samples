<template>
  <layout-demo>
    <div class="nav">
      <router-link to="/">Home</router-link> | 
      <router-link to="/demo/">Demo</router-link> | 
    </div>
    <div class="nav">
      <router-link v-t="'nav.home'" to="/demo/i18n/"/> |
      <router-link v-t="'nav.about'" to="/demo/i18n/about/"/> | 
      <router-link v-t="'nav.change-language'" v-bind:to="changeLanguageTo"/>
    </div>
    <router-view/>
  </layout-demo>
</template>

<script>
export default {
  computed: {
    changeLanguageTo() {
      switch (this.$i18n.locale) {
        case 'en':
          return '/demo/i18n/ja';
        default:
          return '/demo/i18n/en';
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.nav {
  padding: 8px 0;
}
</style>
